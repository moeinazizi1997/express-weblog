import { BadRequestException, NotFoundException } from "../../../utils/catch-error";
import logger from "../../../utils/logger";
import { User } from "../../user/models/user.model";
import { CreatePostDTO, UpdatePostDTO } from "../DTOs/post.dto";
import { IPost,Post } from "../models/post.model";

class PostService{

    public async getPosts():Promise<IPost[]>{
        const posts = await Post.find({});

        return posts;
    }

    public async findById(id:string){
        const post = await Post.findById(id).populate('author', 'displayName email');

        if(!post){
            throw new NotFoundException("Post with the given Id not found!");
        }
        return post;
    }
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

    public async updatePost(id:string,dto:UpdatePostDTO,imagePath? : string){
        const updateData = { ...dto };
        if (imagePath) updateData.image = imagePath;
        const post = await Post.findByIdAndUpdate(id, updateData, { new: true }).populate('author', 'displayName');
        if(!post){
            throw new NotFoundException("Post with the given data not found!");
        }
        return post;
    }
};

export default PostService;