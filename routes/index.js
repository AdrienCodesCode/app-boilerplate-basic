// index.js router 
import { } from "../controller/controllers.js"

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("index")
})



export default router;