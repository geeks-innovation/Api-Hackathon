'use strict';

const server = require('./app');
const port = 8089;

server.listen(port, 'localhost', function() {
  console.log('Server running on port: %d', port);
});
