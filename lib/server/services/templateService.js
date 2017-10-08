import config from '../config';

function renderHtml(event) {
  const manifest = require('./../../../target/rev-manifest.json');// eslint-disable-line global-require
  const assetsBaseUrl = config.getConfig('/assets/baseUrl', event);
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <link rel="stylesheet" href="${assetsBaseUrl}/${manifest.app[1]}"></link>
        <script>
            window.CORNETTO = {
              cognito : {
                USER_POOL_ID:"${process.env.USER_POOL_ID}",
                APP_CLIENT_ID: "${process.env.USER_POOL_CLIENT_ID}"
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

