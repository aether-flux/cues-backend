const { PrismaClient } = require("../generated/prisma");
const { errorHandler } = require("../utils/errorHandler");

const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  try {
    const taskData = await prisma.task.findMany();

    res.status(200).send({ message: "Records fetched", task: taskData });
  } catch (e) {
    errorHandler(e, res, "fetching all tasks");
  }
};

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

    res.status(200).send({ message: "Record fetched", task });
  } catch (e) {
    errorHandler(e, res, "fetching one task");
  }
};

exports.newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: { title, description, projectId: 2 },
    });

    res.status(200).send({ message: "Task created", task });
  } catch (e) {
    errorHandler(e, res, "task creation");
  }
};

exports.updateTask = async (req, res) => {
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

exports.deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delTask = await prisma.task.delete({ where: { id } });

    res.status(200).send({ message: "Task deleted", task: delTask });
  } catch (e) {
    errorHandler(e, res, "task deletion");
  }
};
