import { PrismaClient } from "../generated/prisma/index.js";
import { errorHandler } from "../utils/errorHandler.js";

const prisma = new PrismaClient();

export const getTasks = async (req, res) => {
  try {
    const taskData = await prisma.task.findMany();

    res.status(200).send({ message: "Records fetched", tasks: taskData });
  } catch (e) {
    errorHandler(e, res, "fetching all tasks");
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

    res.status(200).send({ message: "Record fetched", task });
  } catch (e) {
    errorHandler(e, res, "fetching one task");
  }
};

export const newTask = async (req, res) => {
  try {
    const { title, description, projectId } = req.body;
    const task = await prisma.task.create({
      data: req.body,
    });

    res.status(200).send({ message: "Task created", task });
  } catch (e) {
    errorHandler(e, res, "task creation");
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updTask = await prisma.task.update({
      where: { id },
      data: req.body,
    });

    res.status(200).send({ message: "Task updated", task: updTask });
  } catch (e) {
    errorHandler(e, res, "task updation");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delTask = await prisma.task.delete({ where: { id } });

    res.status(200).send({ message: "Task deleted", task: delTask });
  } catch (e) {
    errorHandler(e, res, "task deletion");
  }
};
