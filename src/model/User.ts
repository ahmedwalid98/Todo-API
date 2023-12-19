import { Schema, model, Document } from "mongoose";
import { hashPassword } from "../utils/hashPassword";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, "name field is required"] },
  email: {
    type: String,
    required: [true, "email field is required"],
    unique: true,
  },
  password: { type: String, required: [true, "Password field is required"] },
});
userSchema.pre("save", async function (this: IUser, next) {
  const user = this;
  const hashedPassword = await hashPassword(user.password, 10);
  user.password = hashedPassword;
  next();
});

const User = model<IUser>("User", userSchema);
export default User;
