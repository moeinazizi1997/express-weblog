import UserController from "./controllers/user.controller";
import UserService from "./services/user.service";

export const userService = new UserService();

export const userController = new UserController(userService);