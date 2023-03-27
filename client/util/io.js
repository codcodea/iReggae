
/* 
  Objects of this class handles the individual clients and its socket connection 
*/

import { createMessageIn, createMessageOut } from "./message.js";

class IO {
  baseUrl = "http://localhost:3020";
  baseWs = "ws://localhost:3020";
  secretToken = "secretToken-123";

  constructor() {
    this.id = null;
    this.socket = null;

    // Bind this to methods
    this.sendMessage = this.sendMessage.bind(this);
    this.registerClient = this.registerClient.bind(this);
    this.appendMessage = this.appendMessage.bind(this);
    this.messageTemplate = this.messageTemplate.bind(this);
  }

  // Connect client to the server
  connectToServer() {
    this.nickname = window.name;
    this.socket = new WebSocket(this.baseWs + `/chat/${this.id}`);
    this.socket.onopen = () => console.log("connected to server");
    this.socket.onmessage = (msg) => this.appendMessage(JSON.parse(msg.data));
    this.socket.onclose = () => console.log("disconnected from server");

    return !!this.socket;
  }

  // Create a new message object and send it to the server
  sendMessage(e, message) {
    e.preventDefault();
    this.socket.send(this.messageTemplate(message));
  }

  // Create a message object
  messageTemplate(message) {
    return (message = JSON.stringify({
      id: this.id,
      text: message,
      name: this.nickname,
      time: new Date().toLocaleTimeString(),
    }));
  }

  // Append message to DOM
  appendMessage(message) {
    if (message.id == this.id) createMessageOut(message);
    else createMessageIn(message);
  }

  // Register client to the server
  async registerClient() {
    const token = this.secretToken;
    const options = { method: "POST" };
    const url = this.baseUrl + `/register/auth/${token}`;

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      
      if (result.message === "unauthorized") return false;
      this.id = result;

    } catch (err) {
      console.error(err);
      return false;
    }

    return this.connectToServer();
  }
}

export default IO;
