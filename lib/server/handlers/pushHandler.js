function createFog(event, context, cb) {
  cb(null, { Foo: 'bar' });
}

module.exports.createFog = createFog;
