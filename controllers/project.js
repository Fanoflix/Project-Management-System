import httpCodes from "../config/httpCodes.js";
import generalMessages from "../config/generalMessages.js";
import errorHandler from "../utils/errorHandler.js";
import PrismaPackage from "@prisma/client";

const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

export const create = async (req, res, next) => {
  try {
    const adminId = parseInt(req.userId);

    const {name, description} = req.body
    
    const user = await prisma.user.findUnique(
      {
        where : {id: adminId}
      }
    );

    const project = await prisma.project.create({
      data: {
        adminId,
        name,
        description, 
        users: {
          connect:[{ id: adminId }],
        }
      },
      include: {
        users: true, // Include all posts in the returned object
      }
    });
   

    res.status(httpCodes.ok).json({
      project,
      message: `Project created succussfully`,
    });

  } catch (err) {
    res.send(errorHandler(err));
  }
}


export const addUsersToProject = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);

    const {users} = req.body
    
    const user = await prisma.user.findUnique(
      {
        where : {id: adminId}
      }
    );

    const project = await prisma.project.create({
      data: {
        adminId,
        name,
        description, 
        users: {
          connect:[{ id: adminId }],
        }
      },
      include: {
        users: true, // Include all posts in the returned object
      }
    });
   

    res.status(httpCodes.ok).json({
      project,
      message: `Project created succussfully`,
    });

  } catch (err) {
    res.send(errorHandler(err));
  }
}
