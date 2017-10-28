import { CognitoAuth } from '../../lib/amazon-cognito-auth';

let authPromise;

function initCognitoSDK() {
  let resolve;
  let reject;

  authPromise = new Promise(((_resolve_, _reject_) => {
    resolve = _resolve_;
    reject = _reject_;
  }));

  const authData = {
    ClientId: window.CORNETTO.cognito.APP_CLIENT_ID, // Your client id here
    AppWebDomain: window.CORNETTO.cognito.USER_POOL_LOGIN_URL,
    TokenScopesArray: ['openid'],
    RedirectUriSignIn: 'https://mehrnebel.cornetto.cloud/buzzer',
    RedirectUriSignOut: 'https://dutrinkst.cornetto.cloud',
  };
  const auth = new CognitoAuth(authData);
  auth.userhandler = {
    onSuccess(result) {
      resolve(result);
    },
    onFailure(err) {
      reject(err);
    },
  };
  const curUrl = window.location.href;
  auth.parseCognitoWebResponse(curUrl);
  auth.useCodeGrantFlow();
  window.auth = auth;
  return auth;
}

const auth = initCognitoSDK();


function login() {
  auth.getSession();
  return authPromise;
}

function getIdJwtToken() {
  return auth.getCachedSession().getIdToken().getJwtToken();
}
function logout() {
  return auth.signOut();
}
function isLoggedIn() {
  // auth.refreshSession
  return true;
}

export { login, logout, isLoggedIn, getIdJwtToken };
