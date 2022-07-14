const requestHandler = (req, res) => {
  const { method, url } = req;
  console.log(`${method} ${url}`);
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Welcome Home</title></head>');
    res.write('<body><h1>Welcome to my home page</h1>');
    res.write('<a href="http://localhost:3000/users">Users</a>');
    res.write('<form action="/create-user" method="POST">');
    res.write('<input type="text" name="username" />');
    res.write('<button type="submit">Submit</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  } else if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Users List</title></head>');
    res.write('<body><h1>Users:</h1>');
    res.write('<ul>');
    res.write('<li>Shannon</li>');
    res.write('<li>Skip</li>');
    res.write('<li>Chris</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  } else if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split('=')[1];
      console.log(user);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
};

module.exports = {
  handler: requestHandler,
};
