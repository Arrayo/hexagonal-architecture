import { UserRepository } from '../infrastructure/UserRepository';
import { User } from '../domain/User';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.fetchUsers();
    } catch (error) {
      throw new Error('Service error: Failed to fetch users');
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      return await this.userRepository.updateUser(user);
    } catch (error) {
      throw new Error('Service error: Failed to update user');
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.userRepository.deleteUser(id);
    } catch (error) {
      throw new Error('Service error: Failed to delete user');
    }
  }
}
