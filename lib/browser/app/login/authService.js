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

const authPromise = initCognitoSDK()
  .catch((err) => {
    console.error('Error initializing Cognito SDK', err);
  });


async function login() {
  const auth = await authPromise;
  return new Promise((resolve, reject) => {
    auth.userhandler = {
      onSuccess(result) {
        resolve(result);
        console.log('getting session success');
      },
      onFailure(err) {
        auth.signOut();
        reject(err);
      },
    };
    console.log('getting session...');
    auth.getSession();
  });
}

async function getAuthorizationToken() {
  if (process.env.NODE_ENV !== 'production') {
    return 'any token';
  }
  const session = await login();
  return session.getIdToken().getJwtToken();
}

async function logout() {
  const auth = await authPromise;
  return auth.signOut();
}

export { login, logout, getAuthorizationToken };
