import app from "express";
import isAuth from '../middleware/isAuth.js';

const router = app.Router();

import { create } from "../controllers/project.js";

router.post("/", isAuth, create);

export default router;
