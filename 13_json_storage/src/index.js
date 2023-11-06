import "./utils/dotenv.js";
import process from 'node:process';
import jsonRouter from "./routers/json.js";
import express from 'express';
import bodyParser from 'body-parser';


const app = express(),
    PORT = process.env.APP_PORT || 3000,
    HOSTNAME = process.env.APP_HOST || 'localhost',
    APP_NAME = process.env.APP_NAME || 'App';

app.use(bodyParser.raw({type: 'application/json'}));

app.use('/', jsonRouter);

app.listen(PORT, HOSTNAME, () => {
    console.log(`${APP_NAME} is listening at http://${HOSTNAME}:${PORT}`)
});
