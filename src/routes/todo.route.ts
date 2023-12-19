import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import todoService from "../service/todo.service";
import authenticated from "../middleware/authentication";

const router = Router();
router.use(asyncHandler(authenticated));
router
  .route("/:id/todo")
  .post(asyncHandler(todoService.createTodo))
  .get(todoService.getTodos);

router
  .route("/todo/:id")
  .get(asyncHandler(todoService.getTodo))
  .delete(asyncHandler(todoService.removeTodo))
  .put(asyncHandler(todoService.updateTodo));

export default router;
