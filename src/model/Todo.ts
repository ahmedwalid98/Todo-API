import { Schema, model, Types } from "mongoose";

export interface ITodo {
  title: string;
  startDate: Date;
  endDate: Date;
  todoList: Types.ObjectId;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  startDate: { type: Date, default: new Date(Date.now()) },
  endDate: { type: Date, required: true },
  todoList: { type: Schema.Types.ObjectId, ref: "TodoList", required: true },
});

const Todo = model<ITodo>("Todo", TodoSchema);
export default Todo;
