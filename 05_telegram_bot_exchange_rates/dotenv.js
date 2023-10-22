import fs from 'fs';
import process from 'node:process';

function get_env_lines() {
    if (!fs.existsSync('.env')) {
        fs.writeFileSync('.env', '');
        return [];
    }
    return fs.readFileSync('.env').toString().split('\n');
}


export function load_dotenv() {
    let env_lines = get_env_lines()
    for (let line of env_lines) {
        if (line.length > 0) {
            let [key, value] = line.split('=');
            process.env[key] = value.trim();
        }
    }
}
