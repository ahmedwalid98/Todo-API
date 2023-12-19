import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import User from "../model/User";
const authenticated = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token)
    return next(new AppError(401, "You are not logged in please log in first"));

  const decoded: any = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  const user = await User.findOne({ _id: decoded.id });
  if (!user) {
    return next(new AppError("You are not authorized", 401));
  }
  user.password = undefined;
  req.user = user;
  next();
};
export default authenticated;
