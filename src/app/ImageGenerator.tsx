'use client';

import { useState } from 'react';
import { generateImage } from './actions/generateImage';
import Image from 'next/image';

export default function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const prompt = 'A cute cat sitting on a cloud';

  const handleClick = async () => {
    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Generate Image</button>
      {imageUrl && (
        <Image alt={prompt} src={imageUrl} width={256} height={256} />
      )}
    </div>
  );
}
