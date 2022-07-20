const http = require('http');

const routing = require('./routes');

const PORT = 80;

const server = http.createServer(routing);
// or use routing.requestHandler to access that property of the object if exporting and importing that way

server.listen(PORT); // get the server to listen on PORT