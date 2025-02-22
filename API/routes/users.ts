import User from "../models/User";
import config from "../config";
import { imagesUpload } from "../multer";
import express from "express";
import { Error } from "mongoose";
import { OAuth2Client } from "google-auth-library";
import auth, { RequestWithUser } from "../middleware/auth";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.client_id);

usersRouter.post("/google", async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.client_id,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).send({ error: "Google login error!" });
      return;
    }

    const email = payload["email"];
    const id = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];
    if (!email) {
      res.status(400).send({ error: "Not enough user data to continue" });
      return;
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        email: email,
        displayName: displayName,
        password: crypto.randomUUID(),
        googleID: id,
        image: avatar ? avatar : null,
      });
    }
    user.generateToken();

    await user.save();

    res.send({ message: "Login with Google successful!", user });
  } catch (e) {
    next(e);
  }
});
usersRouter.post(
  "/register",
  imagesUpload.single("image"),
  async (req, res, next) => {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        image: req.file ? "images" + req.file.filename : null,
      });

      user.generateToken();
      await user.save();
      res.send({ user, message: "Register success" });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).send(error);
        return;
      }
      next(error);
    }
  },
);

usersRouter.post("/sessions", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).send({ error: "Invalid username." });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(400).send({ error: "Invalid password" });
      return;
    }

    user.generateToken();
    await user.save();

    res.send({ message: "You have successfully logged in!", user });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

usersRouter.delete("/sessions", auth, async (req, res, next) => {
  const reqWithAuth = req as RequestWithUser;
  const userFromAuth = reqWithAuth.user;
  try {
    const user = await User.findOne({ _id: userFromAuth._id });

    if (user) {
      user.generateToken();
      await user.save();
      res.send({ message: "You have successfully logged out." });
    }
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
