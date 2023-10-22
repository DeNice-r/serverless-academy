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


export function supplement_dotenv(key, value) {
    let env_lines = get_env_lines();
    let new_env = '', found = false;
    for (let line of env_lines) {
        if (line.length > 0) {
            let [line_key, line_value] = line.split('=');
            if (line_key === key) {
                line_value = value;
                found = true;
            }
            new_env += `${line_key}=${line_value}\n`;
        }
    }
    if (!found) {
        new_env += `${key}=${value}\n`;
    }
    write_dotenv(new_env);
}

function write_dotenv(env) {
    fs.writeFileSync('.env', env);
}
