import pool from "./pool.js";
import {PathTakenError, PathNotFoundError} from "../utils/errors.js";


export async function createJson(path, json) {
    try {
        return (await pool.query(
            `INSERT INTO jsons (path, json) VALUES ($1, $2) RETURNING *`,
            [path, json]
        )).rows[0];
    } catch (e) {
        console.log(e);
        if (e.code === '23505') {
            throw new PathTakenError(path);
        }
        throw e;
    }
}

export async function getJson(path) {
    let result;
    try {
        result = (await pool.query(
            `SELECT * FROM jsons WHERE path = $1`,
            [path]
        ));
    } catch (e) {
        console.log(e);
        throw e;
    }

    if (result.rowCount === 0) {
        throw new PathNotFoundError(path);
    }

    return result.rows[0];
}
