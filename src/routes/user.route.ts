import { Router } from "express";
import userService from "../service/user.service";
import asyncHandler from "../utils/asyncHandler";
import authenticated from "../middleware/authentication";

const router = Router();

router.post("/sign-up", asyncHandler(userService.createUser));
router.post("/login", asyncHandler(userService.login));
router.post("/logout", asyncHandler(authenticated), userService.logout);
router.get("/me", asyncHandler(authenticated), userService.cuurentLoggedInUser);

export default router;
