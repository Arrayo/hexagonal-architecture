import { UserService } from './UserService';
import { UserRepository } from '../infrastructure/UserRepository';
import { User } from '../domain/User';

jest.mock('../infrastructure/UserRepository');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  const user: User = {
    id: 1,
    name: 'User 1',
    username: 'user1',
    email: 'user1@example.com',
    address: {
      street: '123 Main St',
      suite: 'Apt 1',
      city: 'Cityville',
      zipcode: '12345',
    },
    phone: '123-456-7890',
    website: 'user1.com',
    company: {
      name: 'Company 1',
      catchPhrase: 'Doing things',
      bs: 'business stuff'
    }
  };

  const updatedUser: User = {
    ...user,
    name: 'Updated User'
  };

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository);
  });

  it('should fetch users', async () => {
    const users: User[] = [user];
    userRepository.fetchUsers.mockResolvedValue(users);

    const result = await userService.getUsers();

    expect(result).toEqual(users);
    expect(userRepository.fetchUsers).toHaveBeenCalledTimes(1);
  });

  it('should update a user', async () => {
    userRepository.updateUser.mockResolvedValue(updatedUser);

    const result = await userService.updateUser(updatedUser);

    expect(result).toEqual(updatedUser);
    expect(userRepository.updateUser).toHaveBeenCalledWith(updatedUser);
    expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
  });

  it('should delete a user', async () => {
    userRepository.deleteUser.mockResolvedValue();

    await userService.deleteUser(user.id);

    expect(userRepository.deleteUser).toHaveBeenCalledWith(user.id);
    expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
  });

  it('should handle error when fetching users', async () => {
    const errorMessage = 'Failed to fetch users';
    userRepository.fetchUsers.mockRejectedValue(new Error(errorMessage));

    await expect(userService.getUsers()).rejects.toThrow(errorMessage);
    expect(userRepository.fetchUsers).toHaveBeenCalledTimes(1);
  });

  it('should handle error when updating a user', async () => {
    const errorMessage = 'Failed to update user';
    userRepository.updateUser.mockRejectedValue(new Error(errorMessage));

    await expect(userService.updateUser(updatedUser)).rejects.toThrow(errorMessage);
    expect(userRepository.updateUser).toHaveBeenCalledWith(updatedUser);
    expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
  });

  it('should handle error when deleting a user', async () => {
    const errorMessage = 'Failed to delete user';
    userRepository.deleteUser.mockRejectedValue(new Error(errorMessage));

    await expect(userService.deleteUser(user.id)).rejects.toThrow(errorMessage);
    expect(userRepository.deleteUser).toHaveBeenCalledWith(user.id);
    expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
  });
});
