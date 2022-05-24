import app from "express";
import isAuth from '../middleware/isAuth.js';

const router = app.Router();

import { create, edit, changeTaskStatus, changeTaskPriority, commentOnTask, getAllComments, deleteComment } from "../controllers/task.js";

router.post("/", isAuth, create);
router.put("/:taskId", isAuth, edit);
router.put("/updateStatus/:taskId", isAuth, changeTaskStatus);
router.put("/updatePriority/:taskId", isAuth, changeTaskPriority);
router.post("/commentOnTask", isAuth, commentOnTask);
router.get("/comment/:taskId", isAuth, getAllComments);
router.delete("/comment/:id", isAuth, deleteComment);

export default router;
