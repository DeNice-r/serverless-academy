import jwt from "jsonwebtoken";
import process from "node:process";
import {getUserById} from "../services/users.js";
import {wasTokenIssued, deleteToken} from "../services/tokens.js";


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';


export default async function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken || !await wasTokenIssued(accessToken))
        return res.sendStatus(401);

    try {
        const data = jwt.verify(accessToken, JWT_ACCESS_SECRET);
        req.user = await getUserById(data.id);
        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            await deleteToken(accessToken);
            return res.sendStatus(401);
        }
        console.log(e);
        return res.sendStatus(403);
    }
}
