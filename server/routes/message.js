const store = require("../store");

const message = (ws, req) => {
  
  const { id } = req.params;
  
  // Add client instance to store
  store.setClient(id, ws);

  // WebSocket event handlers
  ws.on("message", (msg) => store.sendToAll(msg));
  ws.on("close", () => store.closeClient(id));
  ws.on('error', (err) => console.log(err.message));
  // ws.on("open", () => store.handleOpen()); // obsolete kept for reference
};

module.exports = message;
