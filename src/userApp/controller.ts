import { resHandler } from "../utils";
import User from "./models";

export const getUsers = async (req: any, res: any) => {
  const users = await User.find();
  return resHandler(res, 200, users);
};

export const createUser = async (req: any, res: any) => {
  const newUser = await User.createAndSave(req.body);
  return resHandler(res, 200, newUser);
};
