import httpCodes from "../config/httpCodes.js";
import generalMessages from "../config/generalMessages.js";
import errorHandler from "../utils/errorHandler.js";
import { throwError } from "../utils/throwError.js";
import PrismaPackage from "@prisma/client";

const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

export const get = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    res.status(httpCodes.ok).json({
      user,
      message: "User retreived successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body.data;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      throwError("User already exists", 403);
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.status(httpCodes.ok).json({
      newUser,
      message: `Survey ${generalMessages.retrieved}`,
    });
  } catch (err) {
    next(err);
  }
};

export const edit = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;

    const data = {
      name,
      email,
      password,
    };

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throwError("User not found", 404);
    }

    const emailExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (emailExist) {
      throwError("Email already exists", 403);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });

    res.status(httpCodes.ok).json({
      updatedUser,
      message: "Edited User succesfully.",
    });
  } catch (err) {
    next(err);
  }
};
