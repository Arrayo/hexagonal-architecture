import { PostRepository } from './PostRepository';

describe('PostRepository Integration', () => {
  let postRepository: PostRepository;

  beforeEach(() => {
    postRepository = new PostRepository();
  });

  it('should fetch posts successfully from the API', async () => {
    const result = await postRepository.fetchPosts();
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('title');
    expect(result[0]).toHaveProperty('body');
    expect(result[0]).toHaveProperty('userId');
  });

  it('should create a post successfully', async () => {
    const newPost = { title: 'Test Post', body: 'This is a test post', userId: 1 };
    const result = await postRepository.createPost(newPost);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(newPost.title);
    expect(result.body).toBe(newPost.body);
    expect(result.userId).toBe(newPost.userId);
  });

  it('should delete a post successfully', async () => {
    const newPost = { title: 'Test Post to Delete', body: 'This post will be deleted', userId: 1 };
    const createdPost = await postRepository.createPost(newPost);

    expect(createdPost).toBeDefined();
    expect(createdPost).toHaveProperty('id');
    await postRepository.deletePost(createdPost.id);

    expect(async () => {
      await postRepository.deletePost(createdPost.id);
    }).not.toThrow();
  });
});
