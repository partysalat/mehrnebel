# Mehrnebel
How often did it happen to you that you have a fog machine and just everybody wants to press the button.
Because there is an app for almost everything today, mehrnebel! is the one for that.  

## Local Development
Just start 
```
npm run watch
```
and go to http://localhost:3000
 
This will spawn the serverless offline plugin, dynamodb and starts a browsersync instance.
Also all your files are watched and the browser reloads itself on changes.

The tests are executed with ava, whenever you save your changes, the unit tests are executed immediately.
There is no hot module replacement, because it requires a lot of overhead if you try to integrate also a server component.

## Deployment
### Serverless
* You have to have valid AWS credentials in your .aws folder or as environment variables.
* you should change under gulp/s3-deploy your S3 location for the assets. (shouldbe created with CFN template as well -> see aaplication-resources-stack.yaml)
* If you like, you can change the serverless.yml to your service name and your custom configs. 

Then you just have to run 
```
npm run deploy
```
and serverless should take care of the rest.
 
When the javascript is build, it will create a rev-manifest.json, which contains the filename of the fingerprinted assets. This file will be bundled by serverlss/webpack and is directly deployed into the lambda function.

### Route 53 
The is an extra cloudformation template, that will take care of the DNS setup. I used cfn-sphere (https://github.com/cfn-sphere/cfn-sphere) which makes 
your life a little bit easier working with Cloudformation stacks. 

As a precondition you have to have a hosted zone in AWS. When you have that, apply your changes to cfn/certificate-stack.yaml and execute 


```
cf sync certicate-stack.yaml
```
and click on the link you get as a domain owner. (see http://docs.aws.amazon.com/de_de/apigateway/latest/developerguide/how-to-custom-domains.html)

After that, copy the arn of the certificate and paste it in dns-stack.yaml in certificateArn. 
Do your changes in dns-stack.yaml and execute 
```
cf sync dns-stack.yaml
```

