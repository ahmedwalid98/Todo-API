import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import authenticated from "../middleware/authentication";
import todoListService from "../service/todolist.service";
const router = Router();

router
  .route("/todolist")
  .post(
    asyncHandler(authenticated),
    asyncHandler(todoListService.createTodoList)
  )
  .get(asyncHandler(authenticated), todoListService.getAllTodos);

router
  .route("/todolist/:id")
  .delete(
    asyncHandler(authenticated),
    asyncHandler(todoListService.deleteTodoList)
  )
  .put(
    asyncHandler(authenticated),
    asyncHandler(todoListService.updateTodoList)
  )
  .get(asyncHandler(authenticated), asyncHandler(todoListService.getTodo));

export default router;
