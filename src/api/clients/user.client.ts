import { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../../core/constants/endpoints';
import { headers } from '../../core/constants/headers';


export class UserClient {
  // initialize the client with request context and base URL
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

  // Method to retrieve a list of users for a specific environment
  async listUsers(environment: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${endpoints.users(environment)}`);
  }

  // Method to create a new user with provided payload data
  async createUser(environment: string, payload: unknown): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}${endpoints.users(environment)}`, {
      headers: headers.json,
      data: payload,
    });
  }

  // Method to retrieve a user by their email address
  async getUserByEmail(environment: string, email: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${endpoints.userByEmail(environment, email)}`);
  }

  // Method to update an existing user's information
  async updateUser(environment: string, email: string, payload: unknown): Promise<APIResponse> {
    return this.request.put(`${this.baseUrl}${endpoints.userByEmail(environment, email)}`, {
      headers: headers.json,
      data: payload,
    });
  }

  // Method to delete a user, optionally using an authentication token
  async deleteUser(environment: string, email: string, token?: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}${endpoints.userByEmail(environment, email)}`, {
      headers: {
        ...headers.json,
        ...(token ? headers.auth(token) : {}),
      },
    });
  }
}
