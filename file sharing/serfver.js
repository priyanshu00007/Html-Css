const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;

  if (req.url === '/upload') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      fs.writeFileSync(`uploads/${query.filename}`, data);
      res.end('File uploaded successfully!');
    });
  } else if (req.url.startsWith('/download/')) {
    const filename = req.url.split('/').pop();
    fs.readFile(`uploads/${filename}`, (err, data) => {
      if (err) {
        res.end('File not found!');
      } else {
        res.end(data);
      }
    });
  } else {
    res.end('Invalid request!');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});