const TEST_COGNITO_CLAIMS = {
  email: 'foo@bar.de',
  name: 'testtest',
  sub: 'gjringorei',
  username: 'testtest',
};


export function getUserNameFromEvent(event) {
  return (event.cognitoPoolClaims && event.cognitoPoolClaims.username) || TEST_COGNITO_CLAIMS.username;
}
export function getCognitoClaimsFromEvent(event) {
  return event.cognitoPoolClaims || TEST_COGNITO_CLAIMS;
}
