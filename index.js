import express from "express";
import dotenv from "dotenv";
import { connection } from "./connect/db.js";
import { router } from "./routes/book.routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/book", router);
async function connect() {
try {
    await connection();
    app.listen(process.env.PORT || 3000, () => {
      console.log("App started Listening");
    });
  } catch (err) {
    console.log("Connection failed", err);
  }
}
connect();
