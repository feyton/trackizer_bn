import { resHandler } from "../utils";
import User from "./models";

export const authKey = async (req: any, res: any, next: any) => {
  const api_key = req.header("x-api-key");
  if (!api_key) return resHandler(res, 403, "You are not allowed");
  const account = await User.findOneBy({ api_key });
  if (account) {
    req.user = account;
    return next();
  }
  return resHandler(res, 403, "You are not allowed");
};
