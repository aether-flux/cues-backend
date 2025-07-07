import { Prisma } from "@prisma/client";

export const errorHandler = (error, res, msg) => {
  // Log the error
  console.error(`Error during '${msg}': `, error);

  // Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).send({ message: "A unique field already exists with this value.", error: "duplicate field" });
      case 'P2003':
        return res.status(400).send({ message: "Reference to a non-existent item.", error: "invalid foreign key" });
      case 'P2025':
        return res.status(404).send({ message: "Record not found.", error: "not found" });
      default:
        return res.status(500).send({ message: "Something went wrong while accessing the database.", error: "database error" });
    }
  }

  // Prisma validation error
  if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).send({ message: "Validation error", error: "Request data did not meet schema requirements" });
  }

  // Fallback for other errors
  return res.status(500).send({ message: `Error occured during: '${msg}'`, error: "server error" });
}
