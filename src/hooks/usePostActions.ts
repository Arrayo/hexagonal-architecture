import { useState, useEffect, useMemo, useCallback } from 'react';
import { Post } from '../post/domain';
import { User } from '../user/domain';
import usePost from './usePost';

/**
 * Custom hook to manage post actions and associated user deletions.
 * @param {User | null} selectedUser - The currently selected user.
 * @param {User[]} users - The list of users.
 * @param {function} handleDeleteUser - Function to delete a user by their ID.
 * @returns {Object} The state and functions for managing posts and associated user deletions.
 */
const usePostActions = (selectedUser: User | null, users: User[], handleDeleteUser: (id: number) => Promise<void>) => {
  // State to hold the new post data
  const [newPost, setNewPost] = useState<Omit<Post, 'id'>>({ title: '', body: '', userId: selectedUser?.id || 0 });
  // Extract functions and errors from the custom usePost hook
  const { createPost, deletePost, errors: postErrors } = usePost();
  // State to hold the list of created posts
  const [createdPosts, setCreatedPosts] = useState<Post[]>([]);
  // State to manage post creation mode
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Update newPost userId whenever selectedUser changes
  useEffect(() => {
    setNewPost(prevNewPost => ({ ...prevNewPost, userId: selectedUser?.id || 0 }));
  }, [selectedUser]);

  // Handle post creation
  const handleCreatePost = useCallback(async () => {
    if (selectedUser) {
      const post = await createPost({ ...newPost, userId: selectedUser.id });
      if (post) {
        setCreatedPosts([...createdPosts, post]);
        setNewPost({ title: '', body: '', userId: selectedUser.id });
        setIsCreatingPost(false);
      }
    }
  }, [createPost, newPost, selectedUser, createdPosts]);

  // Handle post deletion
  const handleDeleteClick = useCallback(async (postId: number) => {
    await deletePost(postId);
    setCreatedPosts(createdPosts.filter(post => post.id !== postId));
  }, [deletePost, createdPosts]);

  // Check if selected user has created any posts
  const userHasCreatedPost = useMemo(() => {
    return createdPosts.some(post => post.userId === selectedUser?.id);
  }, [createdPosts, selectedUser]);

  // Get random users excluding the selected user
  const getRandomUsers = (users: User[], count: number) => {
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Get a list of random users
  const randomUsers = useMemo(() => {
    return getRandomUsers(users.filter(user => user.id !== selectedUser?.id), 2);
  }, [users, selectedUser]);

  // Handle user deletion along with their posts
  const extendedHandleDeleteUser = useCallback(async (userId: number) => {
    await handleDeleteUser(userId);
    const postsToDelete = createdPosts.filter(post => post.userId === userId);
    for (const post of postsToDelete) {
      await handleDeleteClick(post.id);
    }
  }, [handleDeleteUser, createdPosts, handleDeleteClick]);

  return {
    extendedHandleDeleteUser,
    userHasCreatedPost,
    setIsCreatingPost,
    handleDeleteClick,
    handleCreatePost,
    isCreatingPost,
    createdPosts,
    randomUsers,
    setNewPost,
    postErrors,
    newPost,
  };
};

export default usePostActions;
