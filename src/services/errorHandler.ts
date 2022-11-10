import { Request, Response, NextFunction } from "express";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = "Internal server error";

  if (error.message.includes("exists")) {
    status = 409;
    message = "Already exists";
  }

  if (error.message.includes("missing")) {
    status = 400;
    message = "Missing something";
  }

  if (
    error.message.includes("Invalid or expired") ||
    error.message.includes("invalid token")
  ) {
    status = 401;
    message = "Invalid or expired token";
  }

  res.status(status).json(message);
  return;
};
