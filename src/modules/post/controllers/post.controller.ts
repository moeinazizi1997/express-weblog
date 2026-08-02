import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import PostService from "../services/post.service";
import { HTTPSTATUS } from "../../../config/http.config";
import { ApiResponse } from "../../../utils/apiResponse";

class PostController{
    constructor(public readonly postService : PostService){}

    public createPost = asyncHandler(
        async (req:any,res:Response,next:NextFunction): Promise<Response>=>{
            const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
            const post = await this.postService.createPost(req.user.id,req.body,imagePath);
            return res.status(HTTPSTATUS.CREATED).json(ApiResponse.success(post));
        }
    );
};

export default PostController;