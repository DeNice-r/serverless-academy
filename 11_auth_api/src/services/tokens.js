import pool from "./pool.js";


const TokenTypes = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token'
};


function isTokenTypeValid(type) {
    return Object.values(TokenTypes).includes(type);
}


async function addToken(type, token) {
    let result;

    if (!isTokenTypeValid(type))
        throw new Error(`Invalid token type: ${type}`);

    try {
        result = await pool.query(
            `INSERT INTO ${type}s (token) VALUES ($1) RETURNING *`,
            [token]
        );
    } catch (e) {
        console.log(e);
        throw e;
    }

    // No need to check if result.rows.length !== 0 because we are using RETURNING * in the query
    return result.rows[0]
}

export async function addAccessToken(token) {
    return await addToken(TokenTypes.accessToken, token);
}

export async function addTokens(accessToken, refreshToken) {
    return await addToken(TokenTypes.refreshToken, accessToken) && await addToken(TokenTypes.accessToken, refreshToken);
}


async function isTokenValid(type, token) {
    let result;

    if (!isTokenTypeValid(type))
        throw new Error(`Invalid token type: ${type}`);

    try {
        result = await pool.query(
            `SELECT * FROM ${type}s WHERE token = $1`,
            [token]
        );
    } catch (e) {
        console.log(e);
        throw e;
    }

    if (result.rows.length === 0) {
        return false;
    }
}

export async function isAccessTokenValid(token) {
    return await isTokenValid(TokenTypes.accessToken, token);
}

export async function isRefreshTokenValid(token) {
    return await isTokenValid(TokenTypes.refreshToken, token);
}


async function deleteToken(type, token) {
    let result;

    if (!isTokenTypeValid(type))
        throw new Error(`Invalid token type: ${type}`);

    try {
        result = await pool.query(
            `DELETE FROM ${type}s WHERE token = $1 RETURNING *`,
            [token]
        );
    } catch (e) {
        console.log(e);
        throw e;
    }

    return result.rows.length === 0;
}

export async function deleteAccessToken(token) {
    return await deleteToken(TokenTypes.accessToken, token);
}

export async function deleteRefreshToken(token) {
    return await deleteToken(TokenTypes.refreshToken, token);
}
