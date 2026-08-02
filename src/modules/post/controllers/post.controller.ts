import PostService from "../services/post.service";

class PostController{
    constructor(public readonly postService : PostService){}
};

export default PostController;