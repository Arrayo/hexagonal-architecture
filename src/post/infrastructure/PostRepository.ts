import { Post } from '../domain/Post';

export class PostRepository {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  async fetchPosts(): Promise<Post[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  async deletePost(postId: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }
}
