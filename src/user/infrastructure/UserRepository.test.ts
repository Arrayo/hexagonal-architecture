import { UserRepository } from './UserRepository';

describe('UserRepository Integration', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should fetch users successfully from the API', async () => {
    const result = await userRepository.fetchUsers();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('username');
    expect(result[0]).toHaveProperty('email');
  });

  it('should update a user successfully', async () => {
    const users = await userRepository.fetchUsers();
    const userToUpdate = users[0];
    
    const updatedUser = { ...userToUpdate, name: 'Updated Name' };
    const result = await userRepository.updateUser(updatedUser);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('id', updatedUser.id);
    expect(result.name).toBe('Updated Name');
  });

  it('should delete a user successfully', async () => {
    const users = await userRepository.fetchUsers();
    const userToDelete = users[0];

    await userRepository.deleteUser(userToDelete.id);

    expect(async () => {
      await userRepository.deleteUser(userToDelete.id);
    }).not.toThrow();
  });
});
