import UserService from "../services/user.service";

class UserController{
    constructor(public readonly userService : UserService){}
}

export default UserController;