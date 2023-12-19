import { Schema, model, Types } from "mongoose";

enum Status {
  PUPLIC = "puplic",
  PRIVATE = "privat",
  SHAREWITH = "share_with",
}
export interface ITodoList {
  title: string;
  status: Status;
  user: Types.ObjectId;
}

const TodoListSchema = new Schema<ITodoList>({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(Status),
    default: Status.PRIVATE,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const TodoList = model<ITodoList>("TodoList", TodoListSchema);
export default TodoList;
