import pool from "./pool.js";


export async function addToken(token, data) {
    try {
        return await pool.query(
            `INSERT INTO tokens (token, user_id, expires_at) VALUES ($1, $2, to_timestamp($3)) RETURNING *`,
            [token, data.id, data.exp]
        );
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function wasTokenIssued(token) {
    try {
         return (await pool.query(
            `SELECT * FROM tokens WHERE token = $1`,
            [token]
        )).rowCount === 1;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function deleteToken(token) {
    try {
        return (await pool.query(
            `DELETE FROM tokens WHERE token = $1 RETURNING *`,
            [token]
        )).rowCount === 1;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
