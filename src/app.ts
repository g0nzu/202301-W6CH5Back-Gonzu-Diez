import express from "express";
import morgan from "morgan";
import cors from "cors";
export const app = express();
import { shopRouter } from "./router/shop.router";
app.disable("x-powered-by");

const corsOptions = {
  origin: "*",
};
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/shop", shopRouter);
