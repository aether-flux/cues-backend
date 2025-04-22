const { Prisma } = require("../generated/prisma")

exports.errorHandler = (error, res, msg) => {
  // Log the error
  console.error(`Error occured during '${msg}': `, error);

  // Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).send({ message: "Duplicate field value", meta: error.meta });
      case 'P2003':
        return res.status(400).send({ message: "Foreign key constraint failed", meta: error.meta });
      case 'P2025':
        return res.status(404).send({ message: "Record not found", meta: error.meta });
      default:
        return res.status(500).send({ message: "Prisma error", error });
    }
  }

  // Prisma validation error
  if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).send({ message: "Validation error", error });
  }

  // Fallback for other errors
  res.status(500).send({ message: "Unexpected error occurred", error });
}
