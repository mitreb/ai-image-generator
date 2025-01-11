import { z } from 'zod';

export const generatorSchema = z.object({
  prompt: z.string().nonempty({ message: 'Prompt cannot be empty' }),
});

export type GeneratorValues = z.infer<typeof generatorSchema>;
