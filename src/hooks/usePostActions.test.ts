import { renderHook, act } from '@testing-library/react';
import usePostActions from './usePostActions';
import usePost from './usePost';
import { User } from '../user/domain';

// Mock the usePost hook
jest.mock('./usePost');

const mockUsePost = usePost as jest.MockedFunction<typeof usePost>;

describe('usePostActions', () => {
  // Set up the mock implementations before each test
  beforeEach(() => {
    mockUsePost.mockReturnValue({
      createPost: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Test Post',
        body: 'This is a test post',
        userId: 1,
      }),
      deletePost: jest.fn().mockResolvedValue({}),
      errors: {},
      posts: [],
      loading: false,
    });
  });

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  };

  const mockUsers: User[] = [
    mockUser,
    {
      id: 2,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    },
  ];

  it('should create a post correctly', async () => {
    const handleDeleteUser = jest.fn();
    const { result } = renderHook(() =>
      usePostActions(mockUser, mockUsers, handleDeleteUser)
    );

    act(() => {
      result.current.setNewPost({
        title: 'Test Post',
        body: 'This is a test post',
        userId: mockUser.id,
      });
    });

    await act(async () => {
      await result.current.handleCreatePost();
    });

    expect(result.current.createdPosts).toEqual([
      {
        id: 1,
        title: 'Test Post',
        body: 'This is a test post',
        userId: mockUser.id,
      },
    ]);
  });

  it('should delete a post correctly', async () => {
    const handleDeleteUser = jest.fn();
    const { result } = renderHook(() =>
      usePostActions(mockUser, mockUsers, handleDeleteUser)
    );

    await act(async () => {
      await result.current.handleCreatePost();
    });

    await act(async () => {
      await result.current.handleDeleteClick(1);
    });

    expect(result.current.createdPosts).toEqual([]);
    expect(mockUsePost().deletePost).toHaveBeenCalledWith(1);
  });

  it('should handle user deletion and associated posts correctly', async () => {
    const handleDeleteUser = jest.fn();
    const { result } = renderHook(() =>
      usePostActions(mockUser, mockUsers, handleDeleteUser)
    );

    await act(async () => {
      await result.current.handleCreatePost();
    });

    await act(async () => {
      await result.current.extendedHandleDeleteUser(1);
    });

    expect(handleDeleteUser).toHaveBeenCalledWith(1);
    expect(mockUsePost().deletePost).toHaveBeenCalledWith(1);
    expect(result.current.createdPosts).toEqual([]);
  });

  it('should update newPost userId when selectedUser changes', async () => {
    const handleDeleteUser = jest.fn();
    const { result, rerender } = renderHook(
      ({ user }) => usePostActions(user, mockUsers, handleDeleteUser),
      {
        initialProps: { user: mockUser },
      }
    );

    act(() => {
      result.current.setNewPost({
        title: 'Test Post',
        body: 'This is a test post',
        userId: mockUser.id,
      });
    });

    expect(result.current.newPost.userId).toBe(1);

    const newUser: User = {
      id: 2,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    };
    rerender({ user: newUser });

    expect(result.current.newPost.userId).toBe(2);
  });

  it('should return random users excluding the selected user', () => {
    const handleDeleteUser = jest.fn();
    const { result } = renderHook(() =>
      usePostActions(mockUser, mockUsers, handleDeleteUser)
    );

    expect(result.current.randomUsers).toHaveLength(1);
    expect(result.current.randomUsers).toBeDefined();
  });
});
