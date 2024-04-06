import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import { AppDataSource } from "./data-source";
import { financeRouter } from "./financeApp/routes";
import { authKey } from "./userApp/middleware";
import userRouter from "./userApp/routes";
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.urlencoded({ extended: true }));
    app.use("/users", userRouter);
    app.use("/fx", authKey, financeRouter);

    app.listen(PORT);

    console.log(`Server started at: http://localhost:${PORT}`);
  })
  .catch((error) => console.log(error));
