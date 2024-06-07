import { renderHook, act } from '@testing-library/react-hooks';
import useCreateUser from './useCreateUser';
import { UserService } from '../user/application';

// Mock the UserService
jest.mock('../user/application');

describe('useCreateUser', () => {
  // Set up the mock implementations before each test
  beforeEach(() => {
    UserService.prototype.getUsers = jest.fn().mockResolvedValue([
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com' },
    ]);
    UserService.prototype.updateUser = jest.fn().mockResolvedValue({
      id: 1,
      name: 'Alice',
      username: 'alice',
      email: 'alice@example.com',
    });
    UserService.prototype.deleteUser = jest.fn().mockResolvedValue({});
  });

  it('should fetch users and set the state correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCreateUser());

    await waitForNextUpdate();

    expect(result.current.users).toEqual([
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com' },
    ]);
    expect(result.current.selectedUser).toBeDefined();
  });

  it('should handle user creation correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCreateUser());

    await waitForNextUpdate();

    act(() => {
      result.current.setNewUser({
        name: 'Alice',
        username: 'alice',
        email: 'alice@example.com'
      });
    });

    await act(async () => {
      await result.current.handleCreateUser();
    });

    expect(UserService.prototype.updateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Alice',
        username: 'alice',
        email: 'alice@example.com'
      })
    );
    expect(result.current.selectedUser).toEqual({
      id: 1,
      name: 'Alice',
      username: 'alice',
      email: 'alice@example.com'
    });
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.isEditMode).toBe(false);
    expect(result.current.errors).toEqual({});
  });

  it('should handle validation errors', async () => {
    const { result } = renderHook(() => useCreateUser());

    act(() => {
      result.current.setNewUser({
        name: 'Al',
        username: 'al',
        email: 'invalid-email'
      });
    });

    await act(async () => {
      await result.current.handleCreateUser();
    });

    expect(result.current.errors).toEqual({
      name: 'Name must be at least 4 characters',
      username: 'Username must be at least 4 characters',
      email: 'Email must be valid',
    });
  });

  it('should handle user deletion correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCreateUser());

    await waitForNextUpdate();

    await act(async () => {
      await result.current.handleDeleteUser(1);
    });

    expect(UserService.prototype.deleteUser).toHaveBeenCalledWith(1);
  });
});
