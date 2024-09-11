import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import dbConnection from "./utils/db";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/fabric-frost/api", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server updated");
});

const port = process.env.PORT;
dbConnection();
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
