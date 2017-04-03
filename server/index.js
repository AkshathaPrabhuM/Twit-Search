'use strict';

const express = require('express');
const path = require('path');
const twitter = require('twit');
const http = require('http');
const streamHandler = require('./streamHandler');
const config1 = require('./config');
const PORT = process.env.PORT || 9000;
const app = express();

var TwitStream = require('./TwitStream');

// Create a new twitter instance
var twit = new twitter(config1.twitter);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// start our server
var server = http.createServer(app).listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

// on connection, listen to any new hashtag event
// when we receive a new hashtag event we stop the
// previous stream, and strat a new stream.
// on disconnect, we stop the current stream
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('new hashtag', function(hashtag) {
    console.log('new hashtag - ', hashtag);
    twitStreamStart(hashtag);
  });

  socket.on('disconnect', function(){
    console.log('a user disconnected');
    twitStreamCleanUp();
  });
});

var twitStream = new TwitStream();

// we need to stop the previous streaming if any
// and then start we stream with the givien hashtag
var twitStreamStart = function(hashtag) {
  console.log('twitStreamStart - ', hashtag);
  twitStreamCleanUp();
  var stream =  twit.stream('statuses/filter',{ track: hashtag});
  streamHandler(stream,io);
  twitStream.setStream(stream);
}

// stop the previous streaming is any
var twitStreamCleanUp = function() {
  console.log('Check if we need to stop the twit stream');
  if(typeof twitStream.getStream() != 'undefined') {
    console.log('stopping stream !');
    twitStream.getStream().stop();
  }
};
