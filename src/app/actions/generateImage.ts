'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImage(prompt: string): Promise<string | null> {
  if (!prompt) {
    throw new Error('Prompt is required');
  }

  try {
    const response = await openai.images.generate({
      model: 'dall-e-2',
      prompt,
      n: 1,
      // size: '512x512',
      size: '256x256',
    });

    const url = response.data[0].url ?? null;
    return url;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error generating image:', errorMessage);
    throw new Error(errorMessage);
  }
}
