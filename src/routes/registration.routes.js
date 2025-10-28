import express from "express";
import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registration.controller.js";

const router = express.Router();

// Base URL: /api/registrations
router.post("/", createRegistration);       // Create new registration
router.get("/", getAllRegistrations);       // Get all
router.get("/:id", getRegistrationById);    // Get by ID
router.put("/:id", updateRegistration);     // Update by ID
router.delete("/:id", deleteRegistration);  // Delete by ID

export default router;
