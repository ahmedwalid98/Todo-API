import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import TodoList from "../model/TodoList";

class TodoListService {
  async createTodoList(req: Request | any, res: Response) {
    const { title } = req.body;
    const { id } = req.user;
    const todoList = await TodoList.create({
      title,
      user: id,
    });
    res.status(200).json(todoList);
  }

  async getAllTodos(req: Request | any, res: Response) {
    const id = req.user;
    const todoLists = await TodoList.find({ user: id })
      .populate("user", "name email")
      .exec();
    res.status(200).json(todoLists);
  }

  async deleteTodoList(req: Request | any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const todoList = await TodoList.findOne({ _id: id });
    if (!todoList)
      return next(new AppError(404, "There is no todo list with this id"));
    await todoList.remove();
    res.status(200).json({
      message: "Delted",
    });
  }

  async updateTodoList(req: Request | any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const todoList = await TodoList.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json(todoList);
  }
  async getTodo(req: Request | any, res: Response, next: NextFunction) {
    const { id } = req.params;
    const todoList = await TodoList.findOne({ _id: id });
    if (!todoList)
      return next(new AppError(404, "There is no todo list with this id"));
    res.status(200).json(todoList);
  }
}

const todoListService = new TodoListService();
export default todoListService;
