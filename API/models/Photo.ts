import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  title: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);
export default Photo;
