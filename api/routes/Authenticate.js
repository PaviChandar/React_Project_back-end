import express from "express"
import { register } from "../controllers/AuthenticateController.js";
import { login } from "../controllers/AuthenticateController.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)

export default router