import express from "express";
import { PostController } from "./post.controller";
const router = express.Router();

router.post("/create-Post", PostController.insertIntoDB);
router.get("/", PostController.getAllPost);
router.get("/:id", PostController.getSinglePost);
router.patch("/:id", PostController.updatePost);
export const PostRoutes = router;
