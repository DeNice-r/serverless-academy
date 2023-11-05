import express from "express";
import auth from "../middlewares/auth.js";


const router = express.Router();
router.use(auth)


router.get('/me', async (req, res) => {
    res.send({success: true, data: {id: req.user.id, email: req.user.email}});
})


export default router;
