const { PrismaClient } = require("../generated/prisma");
const { errorHandler } = require("../utils/errorHandler");

const prisma = new PrismaClient();

exports.login = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: "dev@mode.com",
        password: "dummy",
        username: "devmode"
      }
    });

    res.status(200).send({ msg: "User inserted.", user});
  } catch (e) {
    errorHandler(e, res, "logging in")
  }
}
