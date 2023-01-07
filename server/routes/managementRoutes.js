import express from "express";

import { getAdmins } from "../controllers/managementController.js";
const router = express.Router();

router.get("/admins", getAdmins);

export default router;
