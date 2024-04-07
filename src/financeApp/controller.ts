import { resHandler } from "../utils";
import { Account, Category, SubCategory, Transaction } from "./models";
import { extractTransactionInfo, generateHash } from "./util";

async function getAccount(provider: any) {
  const account = await Account.findOneBy({ provider });
  if (!account) {
    const account = await Account.createAndSave({
      name: provider,
      provider,
      description: "To be added",
    });
    return account;
  }
  return account;
}

const checkSmsExists = async (hash: string) => {
  const exists = await Transaction.findOneBy({ ref_no: hash });
  if (exists) return true;
  return false;
};

export const parseSMS = async (req: any, res: any) => {
  const { sms, provider } = req.body;
  const hash = generateHash(sms.toLowerCase());
  const exists = await checkSmsExists(hash);
  if (exists) {
    return resHandler(res, 400, "The transaction has been recorded");
  }
  const info = extractTransactionInfo(sms);
  const account = await getAccount(provider);
  const transaction = await Transaction.createAndSave({
    account,
    ...info,
    sms,
    ref_no: hash,
  });

  return resHandler(res, 200, transaction);
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
