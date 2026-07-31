import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler";
import UserService from "../services/user.service";
import { HTTPSTATUS } from "../../../config/http.config";
import { ApiResponse } from "../../../utils/apiResponse";

class UserController{
    constructor(public readonly userService : UserService){}

    public createUser = asyncHandler(
        async (req:Request,res:Response,next:NextFunction) : Promise<Response>=>{
            const user = await this.userService.createUser(req.body);

            return res.status(HTTPSTATUS.CREATED).json(ApiResponse.success(user));
        }
    );

    public getUser = asyncHandler(
        async (req:Request,res:Response,next:NextFunction) : Promise<Response>=>{
            const id = req.params.id as string;
            const user = await this.userService.findById(id);

            return res.status(HTTPSTATUS.OK).json(ApiResponse.success(user))
        }
    );

    public updateUser = asyncHandler(
        async (req:Request,res:Response,next:NextFunction) : Promise<Response>=>{
            const id = req.params.id as string;
            const {displayName,role} = req.body;
            const dto = {
                ...(displayName && { displayName }),
                ...(role && { role }),
            };
            const user = await this.userService.updateUser(id,dto);

            return res.status(HTTPSTATUS.OK).json(ApiResponse.success(user));
        }
    );

    public deleteUser = asyncHandler(
        async (req:Request,res:Response,next:NextFunction) : Promise<Response>=>{
            const id = req.params.id as string;
            const user = await this.userService.deleteUser(id);

            return res.status(HTTPSTATUS.OK).json(ApiResponse.success(user));
        }
    );
}

export default UserController;