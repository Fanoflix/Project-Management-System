import httpCodes from "../config/httpCodes.js";
import {throwError} from "../utils/throwError.js";
import PrismaPackage from "@prisma/client";

const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

export const create = async (req, res, next) => {
  try {
    const projectId = parseInt(req.body.projectId);
    const {title, description, status, priority} = req.body;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    })

    if(!project){
      throwError("Project Not Found!", 404);
    }

    const task = await prisma.task.create({
      data: {
        projectId,
        title,
        description,
        status,
        priority
      },
      include: {
        workItems: true,
        comments: true
      }
    })
    
    res.status(httpCodes.ok).json({
      task,
      message: `Task created succussfully`,
    });

  } catch (err) {
    next(err);
  }
}

export const edit = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const {title, description, status, priority} = req.body;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    })

    if(!task){
      throwError("Task Not Found!", 404);
    }

    const newTask = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        title,
        description,
        status,
        priority
      },
      include: {
        workItems: true,
        comments: true
      }
    })
    
    res.status(httpCodes.ok).json({
      newTask,
      message: `Task updated succussfully`,
    });

  } catch (err) {
    next(err);
  }
}

export const changeTaskStatus = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const {status} = req.body;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    })

    if(!task){
      throwError("Task Not Found!", 404);
    }

    const newTask = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        status,
      },
      include: {
        workItems: true,
        comments: true
      }
    })
    
    res.status(httpCodes.ok).json({
      newTask,
      message: `Task status updated succussfully`,
    });

  } catch (err) {
    next(err);
  }
}

export const changeTaskPriority = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const {priority} = req.body;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    })

    if(!task){
      throwError("Task Not Found!", 404);
    }

    const newTask = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        priority,
      },
      include: {
        workItems: true,
        comments: true
      }
    })
    
    res.status(httpCodes.ok).json({
      newTask,
      message: `Task status updated succussfully`,
    });

  } catch (err) {
    next(err);
  }
}

export const commentOnTask = async (req, res, next) => {
  try {

    const userId = parseInt(req.userId);
    const taskId = parseInt(req.body.taskId);
    const text = req.body.text;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    })

    if(!task){
      throwError("Task Not Found!", 404);
    }

    
    const comment = await prisma.comment.create({
      data: {
        taskId,
        authorId: userId,
        text
      }
    })

    res.status(httpCodes.ok).json({
      comment,
      message: `Commented on task successfully!`,
    });

  } catch (err) {
    next(err);
  }
}

export const getAllComments = async (req, res, next) => {
  try {

    const taskId = parseInt(req.params.taskId);

    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    })

    if(!task){
      throwError("Task Not Found!", 404);
    }

    
    const comments = await prisma.comment.findMany({
      where: {
        taskId  
      }
    })

    res.status(httpCodes.ok).json({
      comments,
      message: `Commented retreived successfully!`,
    });

  } catch (err) {
    next(err);
  }
}

export const deleteComment = async (req, res, next) => {
  try {

    const id = parseInt(req.params.id);
 
    const comment = await prisma.comment.delete({
      where:{
        id
      }
    })
   
    res.status(httpCodes.ok).json({
      comment,
      message: `Commented deleted successfully!`,
    });

  } catch (err) {
    next(err);
  }
}

