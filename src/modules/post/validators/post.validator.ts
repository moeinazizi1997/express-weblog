import {z} from "zod";

export const createPostSchema = z.object({
    title : z.string().trim().min(3).max(255),
    content : z.string().trim().min(3),
    image : z.string().trim().min(3).optional()
});

export const updatePostSchema = z.object({
    title : z.string().trim().min(3).max(255).optional(),
    content : z.string().trim().min(3).optional(),
    image : z.string().trim().min(3).optional()
});