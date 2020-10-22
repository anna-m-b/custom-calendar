
const dotenv = require('dotenv')
dotenv.config()
const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.PORT;

//the function that's passed to createServer is called once for every http request made 
//it's called the request handler
//it returns a server object 
const server = http.createServer((request, response) => {
  const { method, url, headers } = request;
  let body = []; //If you know it's going to be string data, the best thing to do is collect the data in an array, then at the 'end', concatenate and stringify it.
  request.on('error', (err) => { // an error in the request stream emits an error event - if we don't listen for it the error will get thrown and crash the program
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
  });
}).listen(port)



//use writeHead to explicitly write headers to the response stream
//statusCode and setHeader use 'implicit headers' meaning node sends them at the correct time before you start sending body data
//Note: It's important to set the status and headers before you start writing chunks of data to the body. This makes sense, since headers come before the body in HTTP responses.







// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
  // res.sendStatus = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World');