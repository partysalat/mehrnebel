import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';


function login({ email, password }) {
  const userPool = new CognitoUserPool({
    UserPoolId: window.CORNETTO.cognito.USER_POOL_ID, //eslint-disable-line
    ClientId: window.CORNETTO.cognito.APP_CLIENT_ID,//eslint-disable-line
  });
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authenticationData = { Username: email, Password: password };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) =>
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err),
    }));
}


export default login;
