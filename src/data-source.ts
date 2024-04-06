import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  AccountSchema,
  CategrySchema,
  SubCategorySchema,
  TransactionSchema,
} from "./financeApp/models";
import { UserSchema } from "./userApp/models";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [
    UserSchema,
    CategrySchema,
    SubCategorySchema,
    AccountSchema,
    TransactionSchema,
  ],
  migrations: [],
  subscribers: [],
});
