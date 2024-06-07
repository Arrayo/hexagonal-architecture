import { PostService } from './PostService';
import { PostRepository } from '../infrastructure/PostRepository';
import { Post } from '../domain/Post';


jest.mock('../infrastructure/PostRepository');

describe('PostService', () => {
  let postService: PostService;
  let postRepository: jest.Mocked<PostRepository>;

  beforeEach(() => {
    postRepository = new PostRepository() as jest.Mocked<PostRepository>;
    postService = new PostService(postRepository);
  });

  it('should fetch posts', async () => {
    const posts: Post[] = [
      { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
      { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
    ];
    postRepository.fetchPosts.mockResolvedValue(posts);

    const result = await postService.getPosts();

    expect(result).toEqual(posts);
    expect(postRepository.fetchPosts).toHaveBeenCalledTimes(1);
  });

  it('should create a post', async () => {
    const newPost = { title: 'New Post', body: 'New Body', userId: 1 };
    const createdPost = { id: 3, ...newPost };
    postRepository.createPost.mockResolvedValue(createdPost);

    const result = await postService.createPost(newPost);

    expect(result).toEqual(createdPost);
    expect(postRepository.createPost).toHaveBeenCalledWith(newPost);
    expect(postRepository.createPost).toHaveBeenCalledTimes(1);
  });

  it('should delete a post', async () => {
    const postId = 1;
    postRepository.deletePost.mockResolvedValue();

    await postService.deletePost(postId);

    expect(postRepository.deletePost).toHaveBeenCalledWith(postId);
    expect(postRepository.deletePost).toHaveBeenCalledTimes(1);
  });

  it('should handle error when fetching posts', async () => {
    const errorMessage = 'Failed to fetch posts';
    postRepository.fetchPosts.mockRejectedValue(new Error(errorMessage));

    await expect(postService.getPosts()).rejects.toThrow(errorMessage);
    expect(postRepository.fetchPosts).toHaveBeenCalledTimes(1);
  });

  it('should handle error when creating a post', async () => {
    const newPost = { title: 'New Post', body: 'New Body', userId: 1 };
    const errorMessage = 'Failed to create post';
    postRepository.createPost.mockRejectedValue(new Error(errorMessage));

    await expect(postService.createPost(newPost)).rejects.toThrow(errorMessage);
    expect(postRepository.createPost).toHaveBeenCalledWith(newPost);
    expect(postRepository.createPost).toHaveBeenCalledTimes(1);
  });

  it('should handle error when deleting a post', async () => {
    const postId = 1;
    const errorMessage = 'Failed to delete post';
    postRepository.deletePost.mockRejectedValue(new Error(errorMessage));

    await expect(postService.deletePost(postId)).rejects.toThrow(errorMessage);
    expect(postRepository.deletePost).toHaveBeenCalledWith(postId);
    expect(postRepository.deletePost).toHaveBeenCalledTimes(1);
  });
});
