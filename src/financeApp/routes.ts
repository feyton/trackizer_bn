import { Router } from "express";
import { authKey } from "../userApp/middleware";
import { resHandler, validate } from "../utils";
import {
  createAccount,
  getAccounts,
  getCategories,
  getTransactions,
  parseSMS,
} from "./controller";
import {
  AccountValidation,
  CategoryValidation,
  SmsValidation,
  SubCategoryValidation,
  TransactionValidation,
} from "./validator";

const financeRouter = Router();

financeRouter.get("/transactions", getTransactions);

financeRouter.post("/transactions", TransactionValidation(), validate);

financeRouter.put("/transactions", async (req, res) => {
  return resHandler(res, 200, { updated: true });
});

financeRouter.post("/sms", authKey, SmsValidation(), validate, parseSMS);
financeRouter.post(
  "/accounts",
  authKey,
  AccountValidation(),
  validate,
  createAccount
);
financeRouter.post("/categories", authKey, CategoryValidation(), validate);
financeRouter.post(
  "/sub-categories",
  authKey,
  SubCategoryValidation(),
  validate
);
financeRouter.get("/categories", getCategories);
financeRouter.get("/accounts", getAccounts);

export { financeRouter };
