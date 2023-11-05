import {compare} from "bcrypt";
import {addUser, getUserByEmail} from "../services/users.js";
import {generateHash, generateTokens, isEmailValid, isPasswordValid} from "../utils/helper.js";
import {InvalidCredentialsError} from "../utils/errors.js";


export async function signUp(email, password) {
    let user;

    if (!(isEmailValid(email) && isPasswordValid(password))) {
        throw new InvalidCredentialsError();
    }

    try {
        const password_hash = await generateHash(password);
        user = await addUser(email, password_hash);
    } catch (e) {
        console.log(e);
        throw e;
    }

    return {id: user.id, ...await generateTokens(user.id)};
}

export async function signIn(email, password) {
    let user, password_hash;

    if (!(isEmailValid(email) && isPasswordValid(password))) {
        throw new InvalidCredentialsError();
    }

    try {
        user = await getUserByEmail(email)
        password_hash = await generateHash(password);
    } catch (e) {
        console.log(e);
        throw e;
    }

    if (!await compare(password, password_hash)) {
        throw new InvalidCredentialsError();
    }

    return {id: user.id, ...await generateTokens(user.id)};
}
