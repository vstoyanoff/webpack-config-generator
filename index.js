const http = require('http');
const app = require('./app');

(async () => {
  try {
    app.set('port', 15015);
    const httpServer = http.createServer(app);
    httpServer.listen(15015);
  } catch (err) {
    console.error(err);
  }
})();
