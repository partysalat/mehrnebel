function createFog(event, context, cb) {
  cb(null, { data: event.cognitoPoolClaims });
}

module.exports.createFog = createFog;
