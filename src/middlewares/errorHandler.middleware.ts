import { ErrorRequestHandler, Response} from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/AppError";
import { z } from "zod";
import logger from "../utils/logger";
import { ApiResponse } from "../utils/apiResponse";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json(ApiResponse.error(errors));
};

const errorHandlerMiddleware : ErrorRequestHandler = (err,req,res,next): any=>{
    logger.error(`Error occured on PATH: ${req.path} and error is:${err.message}`);

    if(err instanceof AppError){
        return res.status(err.statusCode).json(ApiResponse.error([err.message]))
    };

    if (err instanceof z.ZodError) {
        return formatZodError(res, err);
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(["Internal Server Error"]))
};

export default errorHandlerMiddleware;