import httpCodes from "../config/httpCodes.js";
import { throwError } from "../utils/throwError.js";
import PrismaPackage from "@prisma/client";
import jwt from "jsonwebtoken";

const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body.data;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throwError("User not found!", 401);
    }

    const token = jwt.sign(
      {
        email: user.name,
        id: user.id.toString(),
      },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.status(httpCodes.ok).json({
      token,
      user,
      message: `Logged in succussfully!`,
    });
  } catch (err) {
    next(err);
  }
};
