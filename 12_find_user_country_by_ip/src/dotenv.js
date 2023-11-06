import fs from 'fs';
import process from 'node:process';


loadDotenv()


function get_env_lines() {
    if (!fs.existsSync('.env')) {
        fs.writeFileSync('.env', '');
        return [];
    }
    return fs.readFileSync('.env').toString().split('\n');
}


function loadDotenv() {
    let env_lines = get_env_lines()
    for (let line of env_lines) {
        if (line.length > 0) {
            let parts = line.split('=');
            process.env[parts[0]] = parts.slice(1).join('=').trim();
        }
    }
}
