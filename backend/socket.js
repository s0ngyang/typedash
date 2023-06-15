const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  // Handle connection logic for each client here

  // Listen for an event from the client
  socket.on('sessionCreated', (data) => {
    console.log('Received session data:', data);
    socket.emit('sessionCreated', { sessionId: data });
  });
});

const port = process.env.PORT || 3000; // Replace with your desired port number
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = io;
