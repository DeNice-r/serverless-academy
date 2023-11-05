import jwt from "jsonwebtoken";
import process from "node:process";
import {getUserById} from "../services/users.js";
import {deleteAccessToken} from "../services/tokens.js";


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';


export default async function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) return res.sendStatus(401);

    try {
        req.user = await getUserById(jwt.verify(accessToken, JWT_ACCESS_SECRET).id);
        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            await deleteAccessToken(accessToken);
            return res.sendStatus(401);
        }
        console.log(e);
        return res.sendStatus(403);
    }
}
