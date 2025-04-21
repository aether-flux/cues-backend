const { PrismaClient } = require("../generated/prisma");

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
    console.error("Full error:", JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
    res.status(500).send({ error: `Error occured: ${e.message || e}`});
  }
}
