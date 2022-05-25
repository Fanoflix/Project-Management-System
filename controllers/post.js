import httpCodes from "../config/httpCodes.js";
import generalMessages from "../config/generalMessages.js";
import errorHandler from "../utils/errorHandler.js";
import { throwError } from "../utils/throwError.js";
import PrismaPackage from "@prisma/client";

const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

export const create = async (req, res, next) => {
  try {
    const { topic, content, isImportant } = req.body.data;
    let projectId = parseInt(req.body.data.projectId);
    // const files = req.files;
    const userId = parseInt(req.userId);

    console.log(req.body.data);
    console.log(userId);

    const post = await prisma.post.create({
      data: {
        authorId: userId,
        projectId: projectId,
        topic,
        content,
        isImportant,
      },
    });

    // let modifiedFiles;
    // if (files.length > 0) {
    //   modifiedFiles = files.map((singleFile) => {
    //     const newfile = {
    //       projectId: projectId,
    //       postId: post.id,
    //       originalName: singleFile.originalname,
    //       mimetype: singleFile.mimetype,
    //       filename: singleFile.filename,
    //       path: singleFile.path,
    //       size: singleFile.size,
    //     };

    //     return newfile;
    //   });

    //   const workitems = await prisma.workItem.createMany({
    //     data: modifiedFiles,
    //   });
    // }
    console.log(post);

    console.log("createing posts");
    res.status(httpCodes.ok).json({
      post,
      message: `Post created succussfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllPostOfProject = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);

    const posts = await prisma.post.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        workItems: true, // Include all workitems in the returned object
      },
    });

    console.log(posts);

    res.status(httpCodes.ok).json({
      posts,
      message: `Posts retreived succussfully`,
    });
  } catch (err) {
    next(err);
  }
};

// Extra Api's
export const get = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        workItems: true,
      },
    });

    if (!post) {
      throwError("Post not found!", 404);
    }

    res.status(httpCodes.ok).json({
      post,
      message: `Post retrieved succussfully!`,
    });
  } catch (err) {
    next(err);
  }
};
