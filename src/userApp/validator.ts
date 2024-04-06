import bcrypt from "bcrypt";
import { body } from "express-validator";
import User from "./models";

export const UserValidator = () => [
  body("email", "A valid email is required")
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ where: { email: email } });
      if (user) return Promise.reject("user_conflict");
    }),
  body("password", "A strong password required")
    .isStrongPassword()
    .bail()
    .customSanitizer((value) => {
      const hash = bcrypt.hash(value, 10);
      return hash;
    }),
  body("firstName", "This too is required").notEmpty(),
  body("lastName", "This too is required").notEmpty(),
];
