
/* 
  This file contains handlers for incoming- and outgoing message logic.
*/

import { sideEffects, playReggae } from "./effects.js";

const messageIn = document.querySelector("#template-message-in");
const messageOut = document.querySelector("#template-message-out");
const messageContainer = document.querySelector(".message-container");

// Chat client commands
const COMMANDS = ["/play", "/stop", "/close"];

// Append an incoming message
function createMessageIn(message) {
  
  if (COMMANDS.includes(message.text)) return;

  // clone the template
  const node = messageIn.content.cloneNode(true);

  const text = node.querySelector(".message-text");
  const name = node.querySelector(".sender-name");
  const time = node.querySelector(".message-time");

  // set the message text
  text.textContent = message.text;
  name.textContent = message.name;
  time.textContent = message.time;

  // append the message to the DOM
  messageContainer.appendChild(node);

  // call side effects
  sideEffects();
}

// Append an outgoing message
function createMessageOut(message) {

  if (message.text === COMMANDS[0]) playReggae("play");
  else if (message.text === COMMANDS[1]) playReggae("stop");
  else if (message.text === COMMANDS[2]) return window.close();

  // clone, add, append
  const node = messageOut.content.cloneNode(true);
  const text = node.querySelector(".message-text");
  const time = node.querySelector(".message-time");

  text.textContent = message.text;
  time.textContent = message.time;

  messageContainer.appendChild(node);
  sideEffects();
}

export { createMessageIn, createMessageOut };
