import crypto from 'crypto';
import { URL } from 'url';


export function generateToken() {
    return crypto.randomBytes(4).toString('base64').slice(0,-2).replace(/\//g, '_').replace(/\+/g, '-');
}


export function isUrlValid(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
