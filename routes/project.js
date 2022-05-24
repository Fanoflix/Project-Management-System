import app from "express";
import isAuth from '../middleware/isAuth.js';

const router = app.Router();

import { create, inviteUsersToProject, acceptProjectInviation, get, getAllProjectsOfUser, getProjectInvitesForAUser, rejectProjectInviation } from "../controllers/project.js";

router.post("/invite/:id", isAuth, inviteUsersToProject);
router.get("/", isAuth, getAllProjectsOfUser);
router.get("/invitation", isAuth, getProjectInvitesForAUser);
router.get("/:id", isAuth, get);
router.post("/", isAuth, create);
router.post("/accept", isAuth, acceptProjectInviation);
router.delete("/reject/:id", isAuth, rejectProjectInviation);

export default router;
