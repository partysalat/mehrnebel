import { CognitoAuth } from 'amazon-cognito-auth-js';
import axios from 'axios';

async function initCognitoSDK() {
  const { data } = await axios.get('/api/config');
  return new Promise(((resolve, reject) => {
    const authData = {
      ClientId: data.appClientId,
      UserPoolId: data.userPoolId,
      AppWebDomain: data.userPoolLoginUrl,
      TokenScopesArray: ['openid'],
      RedirectUriSignIn: 'https://mehrnebel.cornetto.cloud/buzzer',
      RedirectUriSignOut: 'https://mehrnebel.cornetto.cloud',
    };
    const auth = new CognitoAuth(authData);
    auth.userhandler = {
      onSuccess() { resolve(auth); },
      onFailure() { reject(auth); },
    };
    const curUrl = window.location.href;
    auth.useCodeGrantFlow();
    auth.parseCognitoWebResponse(curUrl);
    window.auth = auth;
    if (!window.location.search.includes('code')) {
      resolve(auth);
    } else {
      window.history.replaceState({}, document.title, '/buzzer');
    }
    return auth;
  }));
}

// Ugly workaround for possible race condition. When login is called twice (which it obviously can),
// the newer call will overwrite the older one, if the userhandler is set inside the login() method.
// This will result in an unresolved promise and lets it pending till eternity
const loginPromisesCallbacks = [];
const authPromise = initCognitoSDK()
  .then((auth) => {
    auth.userhandler = {
      onSuccess(result) {
        loginPromisesCallbacks.forEach(([resolve]) => resolve(result));
        loginPromisesCallbacks.length = 0;
      },
      onFailure(err) {
        loginPromisesCallbacks.forEach(([_, reject]) => reject(err));
        loginPromisesCallbacks.length = 0;
        auth.signOut();
      },
    };
    return auth;
  })
  .catch((err) => {
    console.error('Error initializing Cognito SDK', err);
  });


async function login() {
  if (process.env.NODE_ENV !== 'production') {
    const MOCK_TOKEN = {
      getIdToken() {
        return {
          getJwtToken() {
            return 'any token';
          },
        };
      },
    };
    return MOCK_TOKEN;
  }

  const auth = await authPromise;
  return new Promise((resolve, reject) => {
    loginPromisesCallbacks.push([resolve, reject]);
    auth.getSession();
  });
}

async function getAuthorizationToken() {
  const session = await login();
  return session.getIdToken().getJwtToken();
}

async function logout() {
  const auth = await authPromise;
  return auth.signOut();
}

export { login, logout, getAuthorizationToken };
