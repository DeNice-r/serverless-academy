import express from 'express';
import {getLink, createLink} from "../services/links.js";
import {LinkNotFoundError} from "../utils/errors.js";
import {isUrlValid} from "../utils/helper.js";


const router = express.Router(),
    APP_DOMAIN = `http://${process.env.APP_DOMAIN || (process.env.APP_HOST + ':' + process.env.APP_PORT)}`;


router.get('/:token', async (req, res) => {
    try {
        const token = req.params.token;
        res.redirect((await getLink(token)).link);
    } catch (e) {
        console.log(e);

        if (e instanceof LinkNotFoundError)
            res.status(404)
        else
            res.status(500)

        res.json({
            success: false,
            error: e.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const link = req.body.link;

        if (!link || !isUrlValid(link)) {
            return res.status(422).json({
                success: false,
                error: 'Invalid link'
            });
        }

        res.json({
            success: true,
            link: `${APP_DOMAIN}/${(await createLink(link)).token}`
        });
    } catch
        (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
});

export default router;
