const express = require('express');

const app = express();

app.use('/users', (req, res) => {
  console.log('Users Route:', req.url);
  res.send('<h1>Users Page</h1>');
});

app.use('/', (req, res) => {
  console.log('Home Route', req.url);
  res.send('<h1>Index Page</h1>');
});

app.listen(3000);
console.log('Server is listening on port 3000');
