import httpCodes from "../config/httpCodes.js";
import generalMessages from "../config/generalMessages.js";
import ApiError from "./ApiError.js";
import DatabaseError from "./DatabaseError.js";
import PrismaPackage from "@prisma/client";

const { Prisma } = PrismaPackage;

export default function errorHandler(err, resourceName = "<Resource>") {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code == "P2002") {
      return new DatabaseError(
        httpCodes.conflict,
        `'${resourceName}' already exists. Unique constraint failed.`
      );
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return new DatabaseError(
      httpCodes.badRequest,
      `Validation failed. For example, a field is missing, or an incorrect field type was provided.`
    );
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return new DatabaseError(httpCodes.internal, generalMessages.internal);
  } else return err;
}
