import PostController from "./controllers/post.controller";
import PostService from "./services/post.service";

export const postService = new PostService();

export const postController = new PostController(postService);