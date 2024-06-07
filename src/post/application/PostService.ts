import { PostRepository } from '../infrastructure/PostRepository';
import { Post } from '../domain/Post';

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async getPosts(): Promise<Post[]> {
    try {
      return await this.postRepository.fetchPosts();
    } catch (error) {
      throw new Error('Service error: Failed to fetch posts');
    }
  }

  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      return await this.postRepository.createPost(post);
    } catch (error) {
      throw new Error('Service error: Failed to create post');
    }
  }

  async deletePost(postId: number): Promise<void> {
    try {
      await this.postRepository.deletePost(postId);
    } catch (error) {
      throw new Error('Service error: Failed to delete post');
    }
  }
}
