import fs from 'fs';
import process from 'node:process';


loadDotenv()


function getEnvLines() {
    if (!fs.existsSync('.env')) {
        fs.writeFileSync('.env', '');
        return [];
    }
    return fs.readFileSync('.env').toString().split('\n');
}


function loadDotenv() {
    let envLines = getEnvLines()
    for (let line of envLines) {
        if (line.length > 0) {
            let parts = line.split('=');
            process.env[parts[0]] = parts.slice(1).join('=').trim();
        }
    }
}
