// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const COLOURS = ["red", "tomato", "blue", "green", 'orange', 'indigo'];

function getRandomColour() {
  return COLOURS[Math.floor(Math.random()*COLOURS.length)]
}

wss.on('connection', function connection(pipeline) {

  //Broadcast number of clients
  wss.broadcast(JSON.stringify({type: "clientCount", count: wss.clients.size}));
  console.log('Client connected');

  //Assign colour to client
  const colour = getRandomColour();
  pipeline.colour = colour;
  pipeline.send(JSON.stringify({type: "changeColour", colour: colour}));

  pipeline.on('message', function incoming(data) {
    let message = JSON.parse(data);

    if (message.type === "postMessage") {
      message.id = uuid.v1();
      message.type = 'incomingMessage';
      wss.broadcast(JSON.stringify(message));
    }

    if (message.type === "postNotification") {
      message.type = 'incomingNotification';
      wss.broadcast(JSON.stringify(message));
    }

  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  pipeline.on('close', () => {
    console.log('Client disconnected')
    wss.broadcast(JSON.stringify({type: "clientCount", count: wss.clients.size}));
  });
});

