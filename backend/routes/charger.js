import express from "express";
import {
  createCharger,
  getChargers,
  getChargersByUser,
  updateCharger,
  deleteCharger,
  getChargerById,
} from "../controllers/chargerController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Assuming you have an auth middleware

const router = express.Router();

// Public route to get all chargers with filters
router.get("/", getChargers);

// Protected routes (require authentication)
router.post("/", authMiddleware, createCharger);
router.get("/user", authMiddleware, getChargersByUser);
router.put("/:id", authMiddleware, updateCharger);
router.delete("/:id", authMiddleware, deleteCharger);
router.get("/:id", authMiddleware, getChargerById);

export default router;
