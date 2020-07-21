'use strict';

const server = require('./app');
const port = 8089;

server.listen(port, 'devecpvm006877', function() {
  console.log('Server running on port: %d', port);
});
