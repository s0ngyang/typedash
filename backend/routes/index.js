// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"}})

app.get('/home', (req, res) => {
  res.render('home')
})

server.listen(3001, () => {
  console.log('Sever running');
});