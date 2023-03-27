
const store = require("../store");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const register = express.Router();

// Endpoint to register a new client
register.post("/auth/:token", (req, res) => {

  const id = uuidv4();            // generate unique id 
  const { token } = req.params;   // get token from request

  /* 
    Obviously this is not a secure way to authenticate the client.
    In a real application you would use a secure authentication method
    such as JWT or OAuth.
  */

  if (token !== "secretToken-123") {
    res.status(400).send("unauthorized");
  } else {
    store.registerClientId(id); // if authorized register client 
    res.status(200).send(id);   // confirm registration with client id
  }
});

// Serves static files (chat client) 
register.use('/', express.static('../client/'))

module.exports = register;