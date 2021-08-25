require('dotenv').config();
const express = require('express');

let { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}!!!`);
});