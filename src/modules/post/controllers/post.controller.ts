import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import PostService from "../services/post.service";
import { HTTPSTATUS } from "../../../config/http.config";
import { ApiResponse } from "../../../utils/apiResponse";

class PostController{
    constructor(public readonly postService : PostService){}

    public getPosts = asyncHandler(
        async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
            const posts = await this.postService.getPosts();
            return res.status(HTTPSTATUS.OK).json(ApiResponse.success(posts));
        }
    );

    public getPost = asyncHandler(
        async(req:Request,res:Response,next:NextFunction):Promise<Response>=>{
            const {id} = req.params;
            const post = await this.postService.findById(id);

            return res.status(HTTPSTATUS.OK).json(ApiResponse.success(post));
        }
    )

    public createPost = asyncHandler(
        async (req:any,res:Response,next:NextFunction): Promise<Response>=>{
            const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
            const post = await this.postService.createPost(req.user.id,req.body,imagePath);
            return res.status(HTTPSTATUS.CREATED).json(ApiResponse.success(post));
        }
    );

    public updatePost = asyncHandler(
        async(req:any,res:Response,next:NextFunction):Promise<Response>=>{
            const {title,content,image} = req.body;
            const dto = {
                ...(title && { title }),
                ...(content && { content }),
                ...(image && { image }),
            };
            const {id} = req.params;
            const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
            const post = await this.postService.updatePost(id, dto, imagePath);

            return res.status(HTTPSTATUS.OK).json(ApiResponse.success(post));
        }
    )
};

export default PostController;