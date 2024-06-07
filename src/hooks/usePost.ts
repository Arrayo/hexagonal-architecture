import { useState, useEffect, useCallback, useMemo } from 'react';
import { PostRepository } from '../post/infrastructure';
import { Post, CreatePost, PostErrors } from '../post/domain';
import { PostService } from '../post/application';

/**
 * Custom hook to manage posts, including fetching, creating, and deleting posts.
 * @returns {Object} The state and functions for managing posts.
 */
const usePosts = () => {
  // State to hold validation errors
  const [errors, setErrors] = useState<PostErrors>({});
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to hold the list of posts
  const [posts, setPosts] = useState<Post[]>([]);

  // Memoize the PostService to avoid unnecessary re-creations
  const postService = useMemo(() => new PostService(new PostRepository()), []);

  // useEffect to fetch posts on component mount
  useEffect(() => {
    /**
     * Fetches posts from the server and updates the state.
     */
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const posts = await postService.getPosts();
        setPosts(posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setErrors({ general: 'Failed to fetch posts' });
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [postService]);

  // useCallback to validate a post before creation
  const validatePost = useCallback((post: CreatePost): PostErrors => {
    const validationErrors: PostErrors = {};
    if (post.title.length < 4) {
      validationErrors.title = 'Title must be at least 4 characters';
    }
    if (post.body.length < 10) {
      validationErrors.body = 'Body must be at least 10 characters';
    }
    return validationErrors;
  }, []);

  // useCallback to handle post creation
  const createPost = useCallback(async (post: CreatePost): Promise<Post | null> => {
    const validationErrors = validatePost(post);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return null;
    }

    try {
      const newPost = await postService.createPost(post);
      setPosts(prevPosts => [...prevPosts, newPost]);
      setErrors({});
      return newPost;
    } catch (error) {
      console.error('Failed to create post:', error);
      setErrors({ general: 'Failed to create post' });
      return null;
    }
  }, [postService, validatePost]);

  // useCallback to handle post deletion
  const deletePost = useCallback(async (postId: number) => {
    try {
      await postService.deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
      setErrors({ general: 'Failed to delete post' });
    }
  }, [postService]);

  return { posts, loading, createPost, deletePost, errors };
};

export default usePosts;
