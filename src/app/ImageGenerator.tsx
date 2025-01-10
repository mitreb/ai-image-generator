'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { generateImage } from './actions/generateImage';
import { WandSparklesIcon, Loader2 } from 'lucide-react';

export default function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const handleClick = async () => {
    setGenerating(true);
    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
      setGeneratedPrompt(prompt);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Create a new image</CardTitle>
          <CardDescription>
            Enter a prompt for your image and click Generate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Input
              name="prompt"
              value={prompt}
              placeholder="a cute cat sitting on a cloud"
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-grow"
            />
            <Button
              disabled={!prompt || generating}
              className="shrink-0"
              onClick={handleClick}
            >
              {generating ? (
                <>
                  <Loader2 className="size-5 animate-spin font-bold" />
                  Generating
                </>
              ) : (
                <>
                  <WandSparklesIcon className="size-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
          {generatedPrompt && !generating ? (
            <>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="text-sm font-medium">
                  <p className="line-clamp-3 text-primary">{generatedPrompt}</p>
                </div>
                <div>
                  {imageUrl && (
                    <Image
                      alt={generatedPrompt}
                      src={imageUrl}
                      width={256}
                      height={256}
                    />
                  )}
                </div>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
