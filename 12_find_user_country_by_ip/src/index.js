import "./dotenv.js";
import {getIpData} from "./ipRanges.js";
import process from 'node:process';
import express from 'express';


const app = express(),
    PORT = process.env.APP_PORT || 3000,
    HOSTNAME = process.env.APP_HOST || 'localhost',
    APP_NAME = process.env.APP_NAME || 'App';

app.get('/whoami', (req, res) => {
    const ip =
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';

    if (!ip) {
        const message = "IP address couldn't be found";
        console.log(message);
        return res.status(400).send(message);
    }

    try {
        const data = getIpData(ip);
        console.log(data);
        res.send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`${APP_NAME} is listening at http://${HOSTNAME}:${PORT}`)
});
