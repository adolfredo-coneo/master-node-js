const fs = require('fs');

const requestHandler = (req, res) => {
  const { method, url } = req;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST">');
    res.write('<input type="text" name="message" />');
    res.write('<button type="submit">Send</button>');
    res.write('</form></body>');
    res.write('</html>');
    return res.end();
  } else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  //process.exit();
  res.setHeader('Content-Type', 'text/html');
  res.write('<head><title>Enter Message</title></head>');
  res.write('<body><h1>JHllo World</h1></body>');
  res.write('</html>');
  res.end();
};

//module.exports = requestHandler;

//module.exports = {
//    handler: requestHandler,
//}

//module.exports.handler = requestHandler;

exports.handler = requestHandler;
