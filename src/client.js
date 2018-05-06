const grpc = require('grpc');
const port = process.env.PORT || 8000;
const protoloader = require('@grpc/proto-loader');

const { helloworld: pb_helloworld } = grpc.loadPackageDefinition(protoloader.loadSync(__dirname + '/helloworld.proto', {}));
const client = new pb_helloworld.Greeter(`127.0.0.1:${port}`, grpc.credentials.createInsecure());

const user = process.env.NAME || 'world';
client.sayHello({ name: user }, function(err, response) {
	console.log('Greeting:', response.message);
});
