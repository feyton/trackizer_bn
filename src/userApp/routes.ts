import { Router } from "express";
import { validate } from "../utils";
import { createUser, getUsers } from "./controller";
import { authKey } from "./middleware";
import { UserValidator } from "./validator";

const userRouter = Router();

userRouter.get("/", authKey, getUsers);
userRouter.post("/", UserValidator(), validate, createUser);

export default userRouter;
