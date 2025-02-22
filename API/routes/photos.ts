import express from "express";
import Photo from "../models/Photo";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import { PhotoWithoutID } from "../types";
import { Error } from "mongoose";

const photosRouter = express.Router();

photosRouter.get("/", async (req, res, next) => {
  try {
    const idQuery = req.query.userID as string;
    if (idQuery) {
      const photos = await Photo.find({ user: idQuery }).populate(
        "user",
        "_id username",
      );
      res.send(photos);
    } else {
      const photos = await Photo.find().populate("user", "_id username");
      res.send(photos);
    }
  } catch (e) {
    next(e);
  }
});

photosRouter.post(
  "/",
  imagesUpload.single("image"),
  auth,
  permit("admin", "user"),
  async (req, res, next) => {
    const reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;
    try {
      const newPhoto: PhotoWithoutID = {
        user: userFromAuth._id.toString(),
        title: req.body.title,
        image: req.file ? "images" + req.file.filename : null,
      };
      const photo = new Photo(newPhoto);
      await photo.save();
      res.send(photo);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).send(error);
        return;
      }

      next(error);
    }
  },
);

photosRouter.delete(
  "/:id",
  auth,
  permit("admin", "user"),
  async (req, res, next) => {
    const reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      res.status(404).send({ error: "Photo not found" });
      return;
    }
    try {
      if (userFromAuth.role === "user") {
        if (photo.user._id.toString() === userFromAuth._id.toString()) {
          await Photo.deleteOne({ _id: req.params.id });
          res.send({ message: "Photo was deleted successfully." });
        } else {
          res
            .status(403)
            .send({ error: "You are trying to delete someone else's photo" });
        }
      } else {
        await Photo.deleteOne({ _id: req.params.id });
        res.send({ message: "Photo was deleted successfully." });
      }
    } catch (e) {
      next(e);
    }
  },
);

export default photosRouter;
