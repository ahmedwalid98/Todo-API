import { Request, Response, NextFunction } from "express";
import Todo from "../model/Todo";
import AppError from "../utils/AppError";

class TodoService {
  async createTodo(req: Request | any, res: Response) {
    const { id } = req.params;
    const { title, endDate } = req.body;
    const todo = await Todo.create({
      title,
      endDate: new Date(Date.now() + endDate * 60 * 60 * 1000),
      todoList: id,
    });

    res.status(200).json(todo);
  }

  async getTodos(req: Request | any, res: Response) {
    const { id } = req.params;
    const todos = await Todo.find({ todoList: id });
    res.status(200).json(todos);
  }

  async getTodo(req: Request | any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id });
    if (!todo) return next(new AppError(404, "No todo with this id"));
    res.status(200).json(todo);
  }

  async removeTodo(req: Request | any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id });
    if (!todo) return next(new AppError(404, "No todo with this id"));
    await todo.remove();
    res.status(200).json(todo);
  }

  async updateTodo(req: Request | any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const todo = await Todo.findOneAndUpdate({ _id: id }, req.body);
    if (!todo) return next(new AppError(404, "No todo with this id"));
    res.status(200).json(todo);
  }
}

const todoService = new TodoService();
export default todoService;
