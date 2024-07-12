import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from './s3.js'

export const upload = multer({
  // storage: multer.memoryStorage(),
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname)
    },
  }),
  limits: { fileSize: 2000000 },
}).single('file')