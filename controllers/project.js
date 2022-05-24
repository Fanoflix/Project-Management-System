import httpCodes from "../config/httpCodes.js";
import generalMessages from "../config/generalMessages.js";
import errorHandler from "../utils/errorHandler.js";
import PrismaPackage from "@prisma/client";

const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

export const get = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        users: true,
        posts: true,
        tasks: true,
        workItems: true
      }
    })

    if(!project){
      throwError("Project not found!", 404);
    }

    res.status(httpCodes.ok).json({
      project,
      message: `Project retrieved succussfully!`,
    });

  } catch (err) {
    next(err)
  }
}

export const getAllProjectsOfUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.userId);

    console.log(userId)
    const projects = await prisma.project.findMany({
      where:{
        users:{
          some:{
            id: userId
          }
        }
      }
    })

    res.status(httpCodes.ok).json({
      projects,
      message: `Projects retreived succussfully`,
    });

  } catch (err) {
    next(err);
  }
}


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
        users: true, // Include all users in the returned object
      }
    });
   
    res.status(httpCodes.ok).json({
      project,
      message: `Project created succussfully`,
    });

  } catch (err) {
    next(err);
  }
}


export const inviteUsersToProject = async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id);

    const {users} = req.body // List of users

    console.log(users);

    const invites = users.map( id => {
      const invite = {
        userId: parseInt(id),
        projectId: projectId
      }
      return invite;
    })

    console.log(invites);
    
    const projectInvitations = await prisma.projectInvitation.createMany(
      {
        data: invites
      }
    );   

    res.status(httpCodes.ok).json({
      projectInvitations,
      message: `Invitations sent succussfully`,
    });

  } catch (err) {
    next(err);
  }
}
export const getProjectInvitesForAUser = async (req, res, next) => {
  try {

    const userId = parseInt(req.userId);

    const invites = await prisma.projectInvitation.findMany({
      where:{
        userId
      },
      include: {
        project: true, // Include all posts in the returned object
      }
    });

    console.log(invites);
    res.status(httpCodes.ok).json({
      invites,
      message: `Invites retreived succussfully!`,
    });

  } catch (err) {
    next(err);
  }
}


export const acceptProjectInviation = async (req, res, next) => {
  try {

    const {invite} = req.body;

    console.log(invite);

    const updatedProject = await prisma.project.update({
      where:{
        id: invite.projectId
      },
      data: {
        users: {
          connect: { id: invite.userId },
        }
      },
      include: {
        users: true, // Include all posts in the returned object
      }
    });

    console.log(updatedProject);

    const deleteProjectInvitation = await prisma.projectInvitation.delete({
      where: {
        id: invite.id,
      },
    })
    
   
    res.status(httpCodes.ok).json({
      updatedProject,
      message: `Join Project succussfully!`,
    });

  } catch (err) {
    next(err);
  }
}

export const rejectProjectInviation = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    
    const deleteProjectInvitation = await prisma.projectInvitation.delete({
      where: {
        id,
      },
    })
    
    res.status(httpCodes.ok).json({
      deleteProjectInvitation,
      message: `Project Invitation deleted succussfully!`,
    });

  } catch (err) {
    next(err);
  }
}
