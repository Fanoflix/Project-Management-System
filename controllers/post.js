import httpCodes from "../config/httpCodes.js";
import generalMessages from "../config/generalMessages.js";
import errorHandler from "../utils/errorHandler.js";
import PrismaPackage from "@prisma/client";

const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

export const create = async (req, res, next) => {
  try {
    console.log(req.file);
    const {topic, content} = req.body
    const files = req.files;

    const post = await prisma.post.create({
      data: {
        topic,
        content,
      },
    });

    const modifiedFiles = files.map(singleFile => {
      const newfile = {
        postId: post.id,
        originalName: singleFile.originalname,
        mimetype: singleFile.mimetype,
        filename: singleFile.filename,
        path: singleFile.path,
        size: singleFile.size
      }

      return newfile;
    })

    const workitems = await prisma.workItem.createMany({
      data: modifiedFiles
    });

    res.status(httpCodes.ok).json({
      post,
      message: `Post created succussfully`,
    });

  } catch (err) {
    res.send(errorHandler(err));
  }
}
