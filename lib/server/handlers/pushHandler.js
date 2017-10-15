function createFog(event, context, cb) {
  console.log(event);
  console.log(context);
  cb(null, { Foo: 'bar' });
}

module.exports.createFog = createFog;
