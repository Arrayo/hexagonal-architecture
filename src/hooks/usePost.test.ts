import { renderHook, act } from '@testing-library/react-hooks';
import usePost from './usePost';
import { PostService } from '../post/application';

// Mock the PostService
jest.mock('../post/application');

describe('usePost', () => {
  // Set up the mock implementations before each test
  beforeEach(() => {
    PostService.prototype.getPosts = jest.fn().mockResolvedValue([
      { id: 1, title: 'First Post', body: 'This is the body of the first post' },
      { id: 2, title: 'Second Post', body: 'This is the body of the second post' },
    ]);
    PostService.prototype.createPost = jest.fn().mockResolvedValue({
      id: 3,
      title: 'New Post',
      body: 'This is the body of the new post',
    });
    PostService.prototype.deletePost = jest.fn().mockResolvedValue({});
  });

  it('should fetch posts and set the state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePost());

    await waitForNextUpdate();

    expect(result.current.posts).toEqual([
      { id: 1, title: 'First Post', body: 'This is the body of the first post' },
      { id: 2, title: 'Second Post', body: 'This is the body of the second post' },
    ]);
    expect(result.current.loading).toBe(false);
  });

  it('should handle post creation correctly', async () => {
    const { result } = renderHook(() => usePost());

    await act(async () => {
      const newPost = await result.current.createPost({
        title: 'New Post',
        body: 'This is the body of the new post',
        userId: 0,
      });
      expect(newPost).toEqual({
        id: 3,
        title: 'New Post',
        body: 'This is the body of the new post',
      });
    });

    expect(PostService.prototype.createPost).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New Post',
        body: 'This is the body of the new post',
      })
    );
    expect(result.current.posts).toContainEqual({
      id: 3,
      title: 'New Post',
      body: 'This is the body of the new post',
    });
    expect(result.current.errors).toEqual({});
  });

  it('should handle validation errors during post creation', async () => {
    const { result } = renderHook(() => usePost());

    await act(async () => {
      const newPost = await result.current.createPost({
        title: 'New',
        body: 'Short',
        userId: 0,
      });
      expect(newPost).toBeNull();
    });

    expect(result.current.errors).toEqual({
      title: 'Title must be at least 4 characters',
      body: 'Body must be at least 10 characters',
    });
  });

  it('should handle post deletion correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePost());

    await waitForNextUpdate();

    await act(async () => {
      await result.current.deletePost(1);
    });

    expect(PostService.prototype.deletePost).toHaveBeenCalledWith(1);
    expect(result.current.posts).toEqual([
      { id: 2, title: 'Second Post', body: 'This is the body of the second post' },
    ]);
  });
});
