import app from "express";
const router = app.Router();

import { create } from "../controllers/post.js";

router.post("/", create);

export default router;
