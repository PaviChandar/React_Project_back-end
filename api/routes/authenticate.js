import express from "express"
import { register } from "../controllers/authenticateController.js";
import { login } from "../controllers/authenticateController.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)

export default router