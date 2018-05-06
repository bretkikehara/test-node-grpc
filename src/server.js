const grpc = require('grpc');
const port = process.env.PORT || 8000;
const protoloader = require('@grpc/proto-loader');

const pb_helloworld = protoloader.loadSync(__dirname + '/helloworld.proto', {});

const server = new grpc.Server();
server.addService(pb_helloworld['helloworld.Greeter'], {
	SayHello: (call, callback) => {
		callback(null, {message: 'Hello ' + call.request.name});
	},
});

server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
server.start();
