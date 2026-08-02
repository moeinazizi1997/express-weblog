import { BadRequestException, NotFoundException } from "../../../utils/catch-error";
import logger from "../../../utils/logger";
import { User } from "../../user/models/user.model";
import { CreatePostDTO } from "../DTOs/post.dto";
import { IPost,Post } from "../models/post.model";

class PostService{
    public async createPost(authorId : string, dto: CreatePostDTO, imagePath?: string): Promise<IPost>{
        const existingUser = await User.findOne({ _id: authorId });

        if (existingUser) {
            throw new NotFoundException("User with this authorId not found.");
        }

        const post = await Post.create({
            ...dto,
            image: imagePath || dto.image,
            author: authorId
        });

        logger.info(`User created: ${post.title}`);

        return post;
    };

    
};

export default PostService;