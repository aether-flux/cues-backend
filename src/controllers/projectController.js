const { PrismaClient } = require("../generated/prisma");
const { errorHandler } = require("../utils/errorHandler");

const prisma = new PrismaClient();

exports.getAllProj = async (req, res) => {
  try {
    const projData = await prisma.project.findMany();

    res.status(200).send({ message: "Records fetched", projects: projData });
  } catch (e) {
    errorHandler(e, res, "fetching all projects");
  }
};

exports.getProj = async (req, res) => {
  try {
    const { id } = req.params;
    const proj = await prisma.project.findUnique({ where: { id: parseInt(id) } });

    res.status(200).send({ message: "Record fetched", project: proj });
  } catch (e) {
    errorHandler(e, res, "fetching one project");
  }
};

exports.newProj = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        userId: 1
      }
    });

    res.status(200).send({ message: "Project created.", project });
  } catch (e) {
    console.error("Error during project creation: ", e);
    errorHandler(e, res, "project creation");
  }
};

exports.updateProj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updateProj = await prisma.project.update({
      where: { id },
      data: req.body,
    });

    res.status(200).send({ message: "Project updated", project: updateProj });
  } catch (e) {
    errorHandler(e, res, "project updation");
  }
};

exports.deleteProj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const delProj = await prisma.project.delete({ where: { id } });

    res.status(200).send({ message: "Project deleted", project: delProj });
  } catch (e) {
    errorHandler(e, res, "project deletion");
  }
};
