import "./utils/dotenv.js";
import process from 'node:process';
import linkRouter from "./routers/link.js";
import express from 'express';


const app = express(),
    PORT = process.env.APP_PORT || 3000,
    HOSTNAME = process.env.APP_HOST || 'localhost',
    APP_NAME = process.env.APP_NAME || 'App';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', linkRouter);

app.listen(PORT, HOSTNAME, () => {
    console.log(`${APP_NAME} is listening at http://${HOSTNAME}:${PORT}`)
});
