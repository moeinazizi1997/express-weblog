import express from "express";
import { userController } from "../user.module";
import { createUserSchema, updateUserSchema, validateRequest } from "../validators/user.validator";
import { objectIdParamSchema } from "../../../middlewares/objectIdValidator.middleware";

const router = express.Router();

router.post("",validateRequest({body : createUserSchema}),userController.createUser);

router.get("/:id",validateRequest({params: objectIdParamSchema,}),userController.getUser);

router.patch("/:id",validateRequest({params: objectIdParamSchema,body:updateUserSchema}),userController.updateUser);

router.delete("/:id",validateRequest({params: objectIdParamSchema}),userController.deleteUser);

export default router;