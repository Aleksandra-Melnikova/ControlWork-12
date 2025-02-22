import config from "./config";
import { promises as fs } from "fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, "images");
    await fs.mkdir(destDir, { recursive: true });
    cb(null, destDir);
  },
  filename: (_req, file, cb) => {
    const ex = path.extname(file.originalname);
    cb(null, "/" + randomUUID() + ex);
  },
});

export const imagesUpload = multer({ storage: imageStorage });
