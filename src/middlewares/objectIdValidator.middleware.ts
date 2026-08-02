import { z } from "zod";
import mongoose from "mongoose";

export const objectIdSchema = z.string().trim().refine(
    (id) => mongoose.Types.ObjectId.isValid(id),
    { message: "Invalid MongoDB ObjectId" }
);

export const objectIdParamSchema = z.object({
  id: objectIdSchema,
});