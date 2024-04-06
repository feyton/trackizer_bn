import { resHandler } from "../utils";
import { Account, Category, SubCategory, Transaction } from "./models";
import { extractTransactionInfo } from "./util";

export const parseSMS = async (req: any, res: any) => {
  const { sms, provider } = req.body;
  const info = extractTransactionInfo(sms);
  console.log(info);
  return resHandler(res, 200, info);
};

export const createAccount = async (req: any, res: any) => {
  const account = await Account.createAndSave(req.body);
  return resHandler(res, 200, account);
};

export const getAccounts = async (req: any, res: any) => {
  const accounts = await Account.find({});
  return resHandler(res, 200, accounts);
};

export const getTransactions = async (req: any, res: any) => {
  const transactions = await Transaction.find({});
  return resHandler(res, 200, transactions);
};

export const getCategories = async (req: any, res: any) => {
  const categories = await Category.find({});
  const subcategories = await SubCategory.find({});
  return resHandler(res, 200, { categories, subcategories });
};
