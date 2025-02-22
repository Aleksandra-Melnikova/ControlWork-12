import express from "express";
import usersRouter from "./routes/users";
import mongoose from "mongoose";
import config from "./config";
import mongoDb from "./mongoDb";
import cors from "cors";
import photosRouter from "./routes/photos";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/photos", photosRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
  });

  process.on("exit", () => {
    mongoDb.disconnect();
  });
};

run().catch((err) => console.log(err));
