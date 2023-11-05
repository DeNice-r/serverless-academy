import {signIn, signUp} from "../controllers/auth.js";
import {EmailTakenError, InvalidCredentialsError} from "../utils/errors.js";
import express from 'express';


const router = express.Router();


router.post('/sign-up', async (req, res) => {
    try {
        res.send({success: true, ...await signUp(req.body.email, req.body.password)});
    } catch (e) {
        if (e instanceof EmailTakenError)
            res.status(409)
        else
            res.status(500)
        res.send({success: false, error: e.message});
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        res.send({success: true, ...await signIn(req.body.email, req.body.password)});
    } catch (e) {
        if (e instanceof InvalidCredentialsError)
            res.status(404)
        else
            res.status(500)
        res.send({success: false, error: e.message});
    }
})


export default router;
