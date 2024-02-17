import express from "express";
import { getAllMentors,fixAppointment } from "../controllers/mentorController.js";
import { isAuthenticated } from "../middlewares/auth.js";
 
const router = express.Router();

router.get("/allmentors",isAuthenticated,getAllMentors);
router.post("/fixappointment",isAuthenticated,fixAppointment);

export default router;