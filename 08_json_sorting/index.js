import {readFile} from 'fs/promises';
import axios from 'axios';
import https from 'https';


const path = './urls.txt';
let tcount = 0, fcount = 0;


readFile(path, 'utf8').then(async data => {
    let requests = [];
    for (let url of data.split('\n')) {
        url = url.trim();
        requests.push(checkUrl(url));
    }
    await Promise.all(requests);
    console.log(`\nFound True values: ${tcount}`);
    console.log(`Found False values: ${fcount}`);
});


async function checkUrl(url) {
    let isDone;
    for (let i = 0; i < 3 && isDone === undefined; i++) {
        await axios.get(url, {httpsAgent: agent}).then(response => {
            if (response.status === 200) {
                isDone = getValue(response.data, 'isDone');
                console.log(response.data, '------------------------> ', isDone);
            }
        }).catch(error => {
        })
    }
    if (isDone === undefined) {
        console.log(`[Fail] ${url}: The endpoint is unavailable`);
    } else {
        tcount += isDone;
        fcount += !isDone;
        console.log(`[Success] ${url}: isDone - ${isDone}`);
    }
}


function getValue(obj, key) {
    if (obj.hasOwnProperty(key)) {
        return obj[key];
    }
    for (const k in obj) {
        if (typeof obj[k] === 'object') {
            const value = getValue(obj[k], key);
            if (typeof value !== 'undefined') {
                return value;
            }
        }
    }
}
