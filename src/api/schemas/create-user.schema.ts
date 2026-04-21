import { z } from 'zod';

// Define and export the schema for creating a new user
// Validates that all required fields are provided with correct data types
export const createUserSchema = z.object({  
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().min(1).max(150),
});
