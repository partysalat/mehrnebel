import config from '../config';

import manifest from './../../../target/rev-manifest.json';

function renderHtml(event) {
  const assetsBaseUrl = config.getConfig('/assets/baseUrl', event);
  const userPoolId = config.getConfig('/cognito/userPoolId', event);
  const appClientId = config.getConfig('/cognito/appClientId', event);
  const userPoolLoginUrl = config.getConfig('/cognito/userPoolLoginUrl', event);
  return `
    <!doctype html>
    <html lang="de" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Cornetto Cloud Login</title>
        <meta name="description" content="Cornetto Cloud Login" />
        <meta charset="utf-8" />
        <meta name="ROBOTS" content="NOINDEX,NOFOLLOW">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=0" />
        <meta name="msapplication-tap-highlight",content="no"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css">
        <link rel="stylesheet" href="${assetsBaseUrl}/${manifest.app[1]}">
        <script>
            window.CORNETTO = {
              cognito : {
                USER_POOL_ID:"${userPoolId}",
                APP_CLIENT_ID: "${appClientId}",
                USER_POOL_LOGIN_URL: "${userPoolLoginUrl}",
              } 
            };
        </script>
      </head>
      <body>
        <div id="root"></div>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
        <script src="${assetsBaseUrl}/${manifest.app[0]}" async defer></script>
      
      </body>
    </html>
    `;
}
export default { renderHtml };

