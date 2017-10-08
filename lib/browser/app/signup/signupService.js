import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';


function signup(name, password, email) {
  const userPool = new CognitoUserPool({
    UserPoolId: window.CORNETTO.cognito.USER_POOL_ID, //eslint-disable-line
    ClientId: window.CORNETTO.cognito.APP_CLIENT_ID,//eslint-disable-line
  });
  const attributes = [];
  attributes.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
  attributes.push(new CognitoUserAttribute({ Name: 'email', Value: email }));
  return new Promise((resolve, reject) =>
    userPool.signUp(name, password, attributes, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result.user);
    })
  );
}
function confirm(user, confirmationCode) {
  return new Promise((resolve, reject) =>
    user.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  );
}

function authenticate(user, email, password) {
  const authenticationData = {
    Username: email,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  return new Promise((resolve, reject) =>
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err),
    })
  );
}

export { signup, authenticate, confirm };
