import { useState, useEffect, useMemo, useCallback } from 'react';
import { UserRepository } from '../user/infrastructure';
import { UserService } from '../user/application';
import { User, CreateUser, Errors } from '../user/domain';

/**
 * Custom hook to manage user creation, updating, and deletion.
 * @returns {Object} The state and functions for managing users.
 */
const useCreateUser = () => {
  // State to hold the new user data
  const [newUser, setNewUser] = useState<CreateUser>({ name: '', username: '', email: '' });
  // State to hold the currently selected user
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // State to manage edit mode
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  // State to hold validation and general errors
  const [errors, setErrors] = useState<Errors>({});
  // State to hold the list of users
  const [users, setUsers] = useState<User[]>([]);

  // Initialize UserService with UserRepository using useMemo for memoization
  const userService = useMemo(() => new UserService(new UserRepository()), []);

  // Function to get a random user from the list of users
  const getRandomUser = (users: User[]): User => {
    return users[Math.floor(Math.random() * users.length)];
  };

  // Function to fetch users and set state
  const fetchUsers = useCallback(async () => {
    try {
      const users = await userService.getUsers();
      setUsers(users);
      setSelectedUser(getRandomUser(users));
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setErrors({ general: 'Failed to fetch users' });
    }
  }, [userService]);

  // Function to validate user inputs
  const validateUser = useCallback((user: CreateUser): Errors => {
    const validationErrors: Errors = {};
    if (user.name.length < 4) validationErrors.name = 'Name must be at least 4 characters';
    if (user.username.length < 4) validationErrors.username = 'Username must be at least 4 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) validationErrors.email = 'Email must be valid';
    return validationErrors;
  }, []);

  // Function to handle user creation or update
  const handleCreateUser = useCallback(async () => {
    const validationErrors = validateUser(newUser);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (selectedUser) {
      try {
        const updatedUser = await userService.updateUser({ ...selectedUser, ...newUser });
        setSelectedUser(updatedUser);
        setIsLoggedIn(true);
        setIsEditMode(false);
        setErrors({});
      } catch (error) {
        setErrors({ general: 'Failed to update user' });
        console.error('Failed to update user:', error);
      }
    }
  }, [newUser, selectedUser, userService, validateUser]);

  // Function to handle user editing
  const handleEditUser = useCallback((user: User) => {
    setSelectedUser(user);
    setNewUser({ name: user.name, username: user.username, email: user.email });
    setIsLoggedIn(false);
    setIsEditMode(true);
  }, []);

  // Function to update the list of users
  const updateUsersList = useCallback(async (updatedUsers: User[]) => {
    if (updatedUsers.length <= 2) {
      await fetchUsers();
    } else {
      setUsers(updatedUsers);
      setSelectedUser(getRandomUser(updatedUsers));
    }
  }, [fetchUsers]);

  // Function to handle user deletion
  const handleDeleteUser = useCallback(async (id: number) => {
    try {
      await userService.deleteUser(id);
      const updatedUsers = users.filter(user => user.id !== id);
      await updateUsersList(updatedUsers);
      resetUserState();
    } catch (error) {
      console.error('Failed to delete user:', error);
      setErrors({ general: 'Failed to delete user' });
    }
  }, [users, userService, updateUsersList]);

  // Function to reset user state
  const resetUserState = () => {
    setIsLoggedIn(false);
    setErrors({});
    setNewUser({ name: '', username: '', email: '' });
    setIsEditMode(false);
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    handleDeleteUser,
    handleCreateUser,
    handleEditUser,
    selectedUser,
    setNewUser,
    isLoggedIn,
    isEditMode,
    newUser,
    errors,
    users,
  };
};

export default useCreateUser;
