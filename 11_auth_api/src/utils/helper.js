import {hash, genSalt} from "bcrypt";
import process from "node:process";
import jwt from "jsonwebtoken";
import {createToken} from "../services/tokens.js";


const SALT_ROUNDS = +process.env.SALT_ROUNDS || 12,
    ACCESS_TOKEN_TTL_SECONDS = process.env.ACCESS_TOKEN_TTL_SECONDS || 60,
    JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret',
    JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'secret';


export async function generateHash(password) {
    return await hash(password, await genSalt(SALT_ROUNDS));
}


export function generateAccessToken(user_id) {
    return jwt.sign({id: user_id}, JWT_ACCESS_SECRET, {expiresIn: `${ACCESS_TOKEN_TTL_SECONDS}s`});
}

export function generateRefreshToken(user_id) {
    return jwt.sign({id: user_id}, JWT_REFRESH_SECRET);
}


export async function generateTokens(user_id) {
    const tokens = {
        accessToken: generateAccessToken(user_id),
        refreshToken: generateRefreshToken(user_id)
    };

    await Promise.all([
        createToken(tokens.accessToken, jwt.verify(tokens.accessToken, JWT_ACCESS_SECRET)),
        createToken(tokens.refreshToken, jwt.verify(tokens.refreshToken, JWT_REFRESH_SECRET))
    ]);

    return tokens;
}


export function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

export function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/;
    return passwordRegex.test(password);
}
