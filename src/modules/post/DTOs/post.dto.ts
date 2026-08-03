export type CreatePostDTO = {
    title : string;
    content : string;
    image?: string;
}

export type UpdatePostDTO = {
    title? : string;
    content? : string;
    image? : string;
}