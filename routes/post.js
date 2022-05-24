import app from "express";
import isAuth from '../middleware/isAuth.js';
const router = app.Router();

import { create, getAllPostOfProject,  get} from "../controllers/post.js";

router.post("/", isAuth, create);
router.get("/all/:projectId", isAuth, getAllPostOfProject);
router.get("/:id", isAuth, get);

export default router;
