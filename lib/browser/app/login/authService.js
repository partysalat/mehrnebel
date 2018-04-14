import { CognitoAuth } from 'amazon-cognito-auth-js';


function initCognitoSDK() {
  return new Promise(((resolve, reject) => {
    const authData = {
      ClientId: window.CORNETTO.cognito.APP_CLIENT_ID, // Your client id here
      UserPoolId: window.CORNETTO.cognito.USER_POOL_ID,
      AppWebDomain: window.CORNETTO.cognito.USER_POOL_LOGIN_URL,
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
    console.error(err);
  });


async function login() {
  const auth = await authPromise;
  return new Promise((resolve, reject) => {
    auth.userhandler = {
      onSuccess(result) {
        resolve(result);
      },
      onFailure(err) {
        reject(err);
      },
    };
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
