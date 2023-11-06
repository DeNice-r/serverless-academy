import pool from "./pool.js";
import {LinkNotFoundError} from "../utils/errors.js";
import {generateToken} from "../utils/helper.js";


export async function createLink(link) {
    let token = generateToken();
    while (await isTokenTaken(token))
        token = generateToken();

    try {
        return (await pool.query(
            `INSERT INTO links (token, link) VALUES ($1, $2) RETURNING *`,
            [token, link]
        )).rows[0];
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function getLink(token) {
    let result;
    try {
        result = await pool.query(
            `SELECT * FROM links WHERE token = $1`,
            [token]
        );
    } catch (e) {
        console.log(e);
        throw e;
    }

    if (result.rowCount === 0) {
        throw new LinkNotFoundError(token);
    }

    return result.rows[0];
}

async function isTokenTaken(token) {
    return (await pool.query(
        `SELECT * FROM links WHERE token = $1`,
        [token]
    )).rowCount !== 0;
}
