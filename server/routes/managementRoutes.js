import express from "express";

import {
  getAdmins,
  getuserPerformance,
} from "../controllers/managementController.js";
const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/:id", getuserPerformance);

export default router;
