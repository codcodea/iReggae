
const register = require("./routes/register");
const message = require("./routes/message");

const express = require("express");
const expressWs = require(`@wll8/express-ws`);
const cors = require("cors");

// Init express 
const app = express();
const port = 3020;

// Init websocket
const { app: wsApp, wsRoute } = expressWs(app);

// Add common middleware 
app.use(express.json());
app.use(cors());
app.set("trust proxy", 1); 

// Mount endpoints
app.get("/", (req, res) => res.send("Live and kicking. Local chat app demo at /register")); 
app.use("/register", register);  
wsApp.ws("/chat/:id", message); 

// Start server
app.listen(port, () => console.log(`http://localhost:${port}/register`));
