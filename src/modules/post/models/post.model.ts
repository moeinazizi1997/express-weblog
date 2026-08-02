import mongoose, { Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  image?: string; // URL/path to image
  author: mongoose.Types.ObjectId;
}

const PostSchema = new mongoose.Schema<IPost>({
  title: { type: String, required: true, index: 'text' },
  content: { type: String, required: true, index: 'text' },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Enable text search
PostSchema.index({ title: 'text', content: 'text' });

export const Post = mongoose.model<IPost>('Post', PostSchema);