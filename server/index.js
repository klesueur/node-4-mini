require('dotenv').config();
const express = require('express');
// controller files imported
const messagesCtrl = require("./controllers/messagesCtrl");

let { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

// endpoints
app.get(`/api/messages`, messagesCtrl.getAllMessages);
app.post(`/api/messages`, messagesCtrl.createMessage);

app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}!!!`);
});