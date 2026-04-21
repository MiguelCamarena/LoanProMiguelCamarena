import { z } from 'zod';

// Define and export the schema for updating an existing user
// Validates that all fields are provided with correct data types when updating
export const updateUserSchema = z.object({
  
  name: z.string(),  
  email: z.string().email(),
  age: z.number().int().min(1).max(150),
});
