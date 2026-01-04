import { Router } from "express";
import { login, callback } from "../controllers/authController";

const authRouter: Router = Router();

authRouter.get("/login", login);
authRouter.get("/callback", callback);

export default authRouter;
