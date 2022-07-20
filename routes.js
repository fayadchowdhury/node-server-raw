const fs = require('fs');

// create a routing function
const requestHandler = (req, res) => { // this creates an HTTP server taking in a request object and sending back a response object
  const url = req.url; // get request URL
  const method = req.method; //get request method
  
  if ( url === '/' )
  {
    res.write('<html>');
    res.write('<head>');
    res.write('<title>');
    res.write('NodeJS Assignment 1')
    res.write('</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>');
    res.write('Hey, enter a username!');
    res.write('</h1>');
    res.write('<form action="/create-user" method="POST"><input type="text" name="data"><button type="submit">Enter!</button></form>'); // create a form that POSTs to /message with a text input named 'data'
    res.write('</body>');
    res.write('</html>');
    return res.end(); // to exit out of the function and not execute any code below 
  }

  if ( url === '/create-user' && method === 'POST' )
  {
    const body = [];
    
    req.on('data', (chunk) => {
      body.push(chunk);
    }); // attaches a listener to listen for incoming data which arrives in buffered chunks
    
    return req.on('end', () => {
      const message = Buffer.concat(body).toString().split('=')[1]; // creates a Buffer object concatenating the message body and then converting it to a string and splits it at delimiter '=' and takes the latter half
      console.log(message);
      res.setHeader('Location', '/');
      res.statusCode = 302;
      res.end();
    }); // attaches a listener to listen for the end of incoming data
  }

  if ( url === '/create-user' && method === 'GET' )
  {
    res.write(`<html>
      <head>
        <title>
          NodeJS Assignment 1
        </title>
      </head>
      <body>
        <ul>
          <li>User 1</li>
          <li>User 2</li>
          <li>User 3</li>
        </ul>
      </body>
    </html>`);
    return res.end();
  }
};

module.exports = requestHandler; // exposing this globally

// also possible to do 
// module.exports = {
//   requestHandler: requestHandler,
//   blah: "blah",
// };