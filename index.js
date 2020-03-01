const http = require('http');
const app = require('./app');

(async () => {
  try {
    const port = process.env.PORT || 15015;
    app.set('port', port);
    const httpServer = http.createServer(app);
    httpServer.listen(port);
  } catch (err) {
    console.error(err);
  }
})();
