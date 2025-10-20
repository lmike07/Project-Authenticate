import Router from "express";
import AuthController from "./src/controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/auth", authController.authenticate);
router.post("/auth/refresh-token", authController.refreshToken);

export default router;