const filesystem = require('fs');

const reqHandler = (req, res) => {
   const url = req.url;
   const method = req.method;
   if (url === '/') {
      res.write('<html>');
      res.write('<head><title>Node Under The Hood</title></head>');
      res.write('<body><form action="/greeting" method="POST"><input type="text" name="greeting"><button type="submit">Send</button></form></body>');
      res.write('</html>');
      return res.end();
   }
   if (url === '/greeting' && method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
         body.push(chunk);
      });
      req.on('end', () => {
         const parseBody = Buffer.concat(body).toString();
         const greeting = parseBody.split('=')[1];
         filesystem.writeFile('greeting.txt', greeting, (err) => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
         });
      });
   }
   res.setHeader('Content-Type', 'text/html');
   res.write('<html>');
   res.write('<head><title>Node manually</title></head>');
   res.write('<body><h1>Message sender</h1></body>');
   res.write('</html>');
   res.end();
};

module.exports = reqHandler;
