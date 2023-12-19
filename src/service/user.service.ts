import { Request, Response, NextFunction, CookieOptions } from "express";
import User from "../model/User";
import AppError from "../utils/AppError";
import * as jwt from "jsonwebtoken";
import { comparePassword } from "../utils/hashPassword";

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (user, res) => {
  const token = signToken(user._id);
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN),
    httpOnly: true,
  };
  res.cookie("jwt", token);
  user.password = undefined;

  res.status(200).json({
    token,
    user,
  });
};
class UserService {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    createSendToken(user, res);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select({
      email: 1,
      password: 1,
      name: 1,
    });
    if (!user)
      return next(new AppError(404, "User with this email is not found"));

    const compare = await comparePassword(password, user.password);
    if (!compare) return next(new AppError(401, "Password is incorrect"));
    createSendToken(user, res);
  }
  cuurentLoggedInUser(req: Request | any, res: Response) {
    const user = req.user;
    res.status(200).json(user);
  }

  logout(req: Request, res: Response) {
    res.cookie("jwt", "logout", {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: "logged out successfuly",
    });
  }
}

const userService = new UserService();
export default userService;
