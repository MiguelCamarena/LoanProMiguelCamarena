import { APIResponse } from '@playwright/test';
import { UserClient } from '../clients/user.client';

// Service class that provides high-level operations for user management
// Acts as an intermediary between tests and the UserClient, providing business logic
export class UserService {
  // injects the UserClient dependency
  constructor(private readonly userClient: UserClient) {}

  // Method to retrieve all users from the specified environment
  // Returns the API response from the list users endpoint
  async list(environment: string): Promise<APIResponse> {
    return this.userClient.listUsers(environment);
  }

  // Method to create a new user with the provided payload in the specified environment
  // Returns the API response from the create user endpoint
  async create(environment: string, payload: unknown): Promise<APIResponse> {
    return this.userClient.createUser(environment, payload);
  }

  // Method to retrieve a user by their email address from the specified environment
  // Returns the API response containing the user data
  async getByEmail(environment: string, email: string): Promise<APIResponse> {
    return this.userClient.getUserByEmail(environment, email);
  }

  // Method to update an existing user's data by email in the specified environment
  // Accepts a payload with the new user information
  // Returns the API response from the update user endpoint
  async update(environment: string, email: string, payload: unknown): Promise<APIResponse> {
    return this.userClient.updateUser(environment, email, payload);
  }

  // Method to delete a user by email from the specified environment
  // Optional token parameter can be passed for authentication if required
  // Returns the API response from the delete user endpoint
  async delete(environment: string, email: string, token?: string): Promise<APIResponse> {
    return this.userClient.deleteUser(environment, email, token);
  }
}
