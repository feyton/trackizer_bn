import { EntitySchema } from "typeorm";
import CustomBaseEntity, { BaseColumnSchemaPart } from "../base.models";

export class Category extends CustomBaseEntity {
  name: any;

  type: any;

  description: any;

  icon: any;
}

export class Account extends CustomBaseEntity {
  name: String;

  description: String;

  currency: String;

  initial_balance: Number;

  account_type: String;

  is_active: boolean;

  available_balance: Number;

  provider: String;
}

export class SubCategory extends CustomBaseEntity {
  id: any;

  name: any;

  type: any;

  description: any;

  icon: any;
}

export class Transaction extends CustomBaseEntity {
  payee: any;

  payment_method: any;

  confirmed: boolean;

  ref_no: string;

  description: string;

  sms: string;

  predictions: string;

  feedback: string;

  type: string;

  date_time: Date;

  amount: Number;

  fees: Number;

  transaction_type: string;
}

export const CategrySchema = new EntitySchema({
  name: "Category",
  tableName: "Category",
  target: Category,
  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "varchar",
    },
    icon: {
      type: "varchar",
      default: "🍉",
    },
  },
});

export const SubCategorySchema = new EntitySchema({
  name: "SubCategory",
  tableName: "SubCategory",
  target: SubCategory,
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: "varchar",
      nullable: false,
    },
    icon: {
      type: "varchar",
      default: "♟️",
    },
    categoryId: {
      nullable: false,
      type: "varchar",
    },
  },
  relations: {
    // @ts-ignore
    category: {
      target: "Category",
      type: "one-to-many",
      joinColumn: true,
      cascade: true,
      eager: true,
    },
  },
});

export const AccountSchema = new EntitySchema({
  name: "Account",
  tableName: "Account",
  target: Account,
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: "varchar",
      nullable: false,
    },
    description: {
      type: "varchar",
      nullable: false,
    },
    currency: {
      type: "varchar",
      nullable: false,
      default: "RWF",
    },
    account_type: {
      type: "varchar",
      nullable: false,
      default: "Bank",
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    available_balance: {
      type: "int",
      default: 0,
    },
    initial_balance: {
      default: 0,
      type: "int",
    },
    icon: {
      type: "varchar",
      default: "💵",
    },
    provider: {
      type: "varchar",
    },
  },
});

export const TransactionSchema = new EntitySchema({
  name: "Transaction",
  tableName: "Transaction",
  target: Transaction,
  columns: {
    ...BaseColumnSchemaPart,
    amount: {
      nullable: false,
      type: Number,
    },
    date_time: {
      type: "time with time zone",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    subcategoryId: {
      nullable: true,
      type: String,
    },
    payment_method: {
      type: "varchar",
      nullable: true,
    },
    confirmed: {
      type: "boolean",
      default: false,
    },
    categoryId: {
      type: "varchar",
      nullable: true,
    },
    accountId: {
      type: "varchar",
      nullable: false,
    },
    sms: {
      type: "text",
      nullable: true,
      unique: true,
    },
    payee: {
      type: "varchar",
      nullable: true,
    },
    ref_no: {
      type: "varchar",
      nullable: true,
    },
    fees: {
      type: "varchar",
      nullable: true,
      default: 0,
    },
    transaction_type: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    // @ts-ignore
    account: {
      target: "Account",
      type: "many-to-one",
      eager: true,
    },
    category: {
      target: "Category",
      type: "many-to-one",
      eager: true,
    },
  },
});
