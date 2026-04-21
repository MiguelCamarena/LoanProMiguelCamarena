import { z } from 'zod';
import { userSchema } from './user.schema';

// Define and export the schema for a list of users
// Validates that the response is an array of user objects
export const usersListSchema = z.array(userSchema);
