import { z } from 'zod';

// Define and export the schema for a user object
// Validates that all required user fields are present with correct data types
export const userSchema = z.object({
  name: z.string(),  
  email: z.string().email(),
  age: z.number().int().min(1).max(150),
});
