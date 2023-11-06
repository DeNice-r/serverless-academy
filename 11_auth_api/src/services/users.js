import pool from "./pool.js";
import {EmailTakenError, InvalidCredentialsError, InvalidIdError} from "../utils/errors.js";


export async function createUser(email, password_hash) {
    let result;
    try {
        result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
            [email, password_hash]
        );
    } catch (e) {
        console.log(e);

        if (e.code === "23505") {
            throw new EmailTakenError();
        }

        throw e;
    }

    // No need to check if result.rows.length !== 0 because we are using RETURNING * in the query
    return result.rows[0]
}


export async function getUserByEmail(email) {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    if (result.rows.length === 0) {
        throw new InvalidCredentialsError();
    }

    return result.rows[0];
}

export async function getUserById(id) {
    let result;
    try {
        result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );
    } catch (e) {
        console.log(e);
        throw e;
    }

    if (result.rows.length === 0) {
        throw new InvalidIdError();
    }

    return result.rows[0];
}
