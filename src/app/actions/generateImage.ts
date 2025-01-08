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

    console.log(url);

    // simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}
