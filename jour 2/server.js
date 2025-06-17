// Configuration et démarrage du serveur HTTP
const http = require('http');

module.exports = (routes) => {
  const server = http.createServer((req, res) => {
    routes(req, res);
  });
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
};
