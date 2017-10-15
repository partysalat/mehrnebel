
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';


function initCognitoSDK() {
  const authData = {
    ClientId: window.CORNETTO.cognito.APP_CLIENT_ID, // Your client id here
    AppWebDomain: window.CORNETTO.cognito.USER_POOL_LOGIN_URL,
    TokenScopesArray: ['openid'],
    RedirectUriSignIn: 'https://mehrnebel.cornetto.cloud',
    RedirectUriSignOut: 'https://dutrinkst.cornetto.cloud',
  };
  const auth = new CognitoAuth(authData);
  auth.userhandler = {
    // onSuccess: <TODO: your onSuccess callback here>,
    // onFailure: <TODO: your onFailure callback here>
    onSuccess(result) {
      // window.alert('Sign in success');
      console.log(result);
    },
    onFailure(err) {
      window.alert(`Error!${err}`);
    },
  };
  // The default response_type is "token", uncomment the next line will make it be "code".
  // auth.useCodeGrantFlow();
  if (!auth.getCurrentUser()) {
    const curUrl = window.location.href;
    auth.parseCognitoWebResponse(curUrl);
  }
  window.auth = auth;
  return auth;
}

const auth = initCognitoSDK();


function login() {
  return auth.getSession();
}
function logout() {
  return auth.signOut();
}


export { login, logout };
