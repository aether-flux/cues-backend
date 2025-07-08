import { PrismaClient } from "../generated/prisma/index.js";
import { errorHandler } from "../utils/errorHandler.js";

const prisma = new PrismaClient();

export const getAllProj = async (req, res) => {
  try {
    const projData = await prisma.project.findMany({ where: { userId: req.user.id }});

    res.status(200).send({ message: "Records fetched", projects: projData });
  } catch (e) {
    errorHandler(e, res, "fetching all projects");
  }
};

export const getProj = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const proj = await prisma.project.findUnique({ where: { id: parseInt(id) } });

    if (proj.userId !== userId) return res.status(403).send({ error: "forbidden project resource", message: "You do not have access to this project." });

    res.status(200).send({ message: "Record fetched", project: proj });
  } catch (e) {
    errorHandler(e, res, "fetching one project");
  }
};

export const newProj = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const project = await prisma.project.create({
      data: {
        name,
        userId,
      }
    });

    res.status(200).send({ message: "Project created.", project });
  } catch (e) {
    console.error("Error during project creation: ", e);
    errorHandler(e, res, "project creation");
  }
};

export const updateProj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    const updateProj = await prisma.project.update({
      where: { id, userId },
      data: req.body,
    });

    res.status(200).send({ message: "Project updated", project: updateProj });
  } catch (e) {
    errorHandler(e, res, "project updation");
  }
};

export const deleteProj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    const delProj = await prisma.project.delete({ where: { id, userId } });

    res.status(200).send({ message: "Project deleted", project: delProj });
  } catch (e) {
    errorHandler(e, res, "project deletion");
  }
};
