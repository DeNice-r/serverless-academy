import express from 'express';
import {getJson, createJson} from "../services/jsons.js";
import {PathTakenError} from "../utils/errors.js";


const router = express.Router();

router.get(/.+/, async (req, res) => {
    try {
        const path = req.url;
        res.json((await getJson(path)).json);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
});

router.put(/.+/, async (req, res) => {
    try {
        const path = req.url;
        const json = req.body;
        res.json(await createJson(path, json));
    } catch (e) {
        console.log(e);
        if (e instanceof PathTakenError)
            res.status(409)
        else
            res.status(500);

        res.json({
            success: false,
            error: e.message
        });
    }
});

export default router;
