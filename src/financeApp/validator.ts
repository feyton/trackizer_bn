import { body } from "express-validator";

export const SmsValidation = () => [
  body("sms", "SMS is required").notEmpty(),
  body("provider", "Provider is required").notEmpty(),
];

export const AccountValidation = () => [
  body("name", "name is required").notEmpty(),
  body("provider").isString(),
  body("initial_balance", "Initial balance is required "),
];

export const CategoryValidation = () => [
  body("name", "Name is required").notEmpty(),
  body("description", "Description is required").notEmpty(),
  body("icon", "Icon is required").notEmpty(),
];
export const SubCategoryValidation = () => [
  body("name", "Name is required").notEmpty(),
  body("description", "Description is required").notEmpty(),
  body("category", "Category is required").notEmpty(),
];

export const TransactionValidation = () => [
  body("amount", "Amount is required").isInt().notEmpty(),
  body("payment_method", "Payment mode is required").notEmpty(),
  body("payee", "Payee is required").notEmpty(),
  body("categoryId", "Category is required").notEmpty(),
  body("accountId", "Account is required").notEmpty(),
  body("sms", "SMS is required"),
];
