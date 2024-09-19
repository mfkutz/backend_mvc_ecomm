import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/login", passportCall("login"), authController.login);
router.post("/register", passportCall("register"), authController.register);
router.get("/current", passportCall("jwt"), authController.current);
router.get("/logout", passportCall("jwt"), authController.logout);

export default router;
