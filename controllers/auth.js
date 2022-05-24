import httpCodes from "../config/httpCodes.js";
import {throwError} from "../utils/throwError.js";
import PrismaPackage from "@prisma/client";
import jwt from 'jsonwebtoken';


const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    
    const student = await prisma.user.findUnique(
      {
        where : {email: email}
      }
    );

    if(!student){
      throwError("User not found!", 401);
    }

    const token = jwt.sign(
      {
        email: student.name,
        id: student.id.toString()
      },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.status(httpCodes.ok).json({
      token,
      student,
      message: `Logged in succussfully!`,
    });

  } catch (err) {
    next(err);
  }
}
