import { z } from 'zod';

// Define and export the schema for error responses
// Validates that error responses contain an error message string
export const errorResponseSchema = z.object({  
  error: z.string(),
});
