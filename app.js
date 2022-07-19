const http = require('http');

const PORT = 80;

const server = http.createServer((req, res) => { // this creates an HTTP server taking in a request object and sending back a response object
  console.log(req.url, req.method);
  // set the header type
  res.setHeader('Content-Type', 'text/html');
  // write the HTMl page line by line (painful!!!)
  res.write('<html>');
  res.write('<head>');
  res.write('<title>');
  res.write('NodeJS raw server!')
  res.write('</title>');
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>');
  res.write('This is a raw NodeJS server!');
  res.write('</h1>');
  res.write('</body>');
  res.write('</html>');
  // close the write process
  res.end();
});

server.listen(PORT); // get the server to listen on PORT