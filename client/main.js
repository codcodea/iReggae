
/* 
  This file initializes the chat client and handles the connection to the server.
*/

import IO from './util/io.js'
import "./util/message.js";

const submit = document.querySelector("#submit");
const message = document.querySelector("#message");

// Create a new instance of the chat IO class
const client = new IO();

// Package of functions to initialize the client
async function initClient() {

  // register client to the server
  const isRegistered = await client.registerClient();

  // grab nickname to lable the new chat client
  document.querySelector("#head").innerHTML = window.name;

  // add event listener to the submit button
  submit.addEventListener('click', (e) => client.sendMessage(e, message.value));

  // feedback to the user if the client is connected to the server
  isRegistered 
    ? message.setAttribute("placeholder", "Aa") 
    : message.setAttribute("placeholder", "Server is down");
}

// Initialize the client when the DOM is ready
document.addEventListener("DOMContentLoaded", initClient)

// Unregister the client if the window is closed
document.addEventListener("beforeunload", () => ws.socket.close());


