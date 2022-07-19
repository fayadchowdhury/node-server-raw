const http = require('http');
const fs = require('fs');
const PORT = 80;

const server = http.createServer((req, res) => { // this creates an HTTP server taking in a request object and sending back a response object
  const url = req.url; // get request URL
  const method = req.method; //get request method
  
  if ( url === '/' )
  {
    res.write('<html>');
    res.write('<head>');
    res.write('<title>');
    res.write('NodeJS raw server!')
    res.write('</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>');
    res.write('Enter a message');
    res.write('</h1>');
    res.write('<form action="/message" method="POST"><input type="text" name="data"><button type="submit">Send!</button></form>'); // create a form that POSTs to /message with a text input named 'data'
    res.write('</body>');
    res.write('</html>');
    return res.end(); // to exit out of the function and not execute any code below 
  }

  if ( url === '/message' && method === 'POST' )
  {
    const body = [];
    
    req.on('data', (chunk) => {
      body.push(chunk);
    }); // attaches a listener to listen for incoming data which arrives in buffered chunks
    
    return req.on('end', () => {
      const message = Buffer.concat(body).toString().split('=')[1]; // creates a Buffer object concatenating the message body and then converting it to a string and splits it at delimiter '=' and takes the latter half
      fs.writeFile('message.txt', message, (err) => {
        if ( err )
        {
          console.log(err);
        }
        res.statusCode = 302; // default redirection status code
        res.setHeader('Location', '/'); // redirects to /
        return res.end();
      });
    }); // attaches a listener to listen for the end of incoming data
  }
});

server.listen(PORT); // get the server to listen on PORT