import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { AuthMiddlewares } from "./middlewares/auth";

const usercontroller = new UserController();
const authcontroller = new AuthController();

export const router = Router();

router.post("/create", usercontroller.store);
router.get("/users", AuthMiddlewares, usercontroller.index);

router.post("/auth", authcontroller.authenticate);