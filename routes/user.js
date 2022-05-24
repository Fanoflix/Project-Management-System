import app from "express";
const router = app.Router();

import { create, get, edit } from "../controllers/user.js";

router.post("/", create);
router.put("/:id", edit);
router.get("/:id", get);

export default router;
