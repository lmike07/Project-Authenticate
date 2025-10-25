import Router from "express";
import AuthController from "./src/controllers/AuthController";
import { AuthMiddleware } from "./src/middlewares/AuthMiddleware";

const router = Router();
const authController = new AuthController();

router.post("/auth", authController.authenticate);
router.post("/auth/refresh-token", authController.refreshToken);
router.get("/users", AuthMiddleware, authController.getUsers);

export default router;