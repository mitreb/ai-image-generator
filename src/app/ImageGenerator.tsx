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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WandSparklesIcon, Loader2, AlertCircle } from 'lucide-react';
import { generateImage } from './actions/generateImage';
import { generatorSchema, GeneratorValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const form = useForm<GeneratorValues>({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const handleGenerateImage = async (values: GeneratorValues) => {
    setGenerating(true);
    setGeneratedPrompt('');
    setImageUrl(null);
    setError(null);
    try {
      const url = await generateImage(values.prompt);
      setImageUrl(url);
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error generating image:', errorMessage);
      setError(errorMessage);
    } finally {
      console.log(111);
      setGenerating(false);
      setGeneratedPrompt(values.prompt);
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
          {/* <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
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
              onClick={handleGenerateImage}
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
          </div> */}

          <Form {...form}>
            <form
              className="flex flex-col space-y-2 gap-2 sm:flex-row sm:items-top sm:gap-0 sm:space-x-2 sm:space-y-0"
              onSubmit={form.handleSubmit(handleGenerateImage)}
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex-grow space-y-0">
                    <FormLabel className="sr-only">Prompt</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="a cute cat sitting on a cloud"
                        onChange={(e) => {
                          field.onChange(e);
                          setError(null);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={generating} className="shrink-0" type="submit">
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
            </form>
          </Form>

          {generatedPrompt && <Separator className="my-4" />}

          <div className="space-y-4">
            {error && (
              <Alert variant="destructive" className="font-base">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-bold">Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {imageUrl && (
              <>
                <Image
                  alt={generatedPrompt}
                  src={imageUrl}
                  width={256}
                  height={256}
                />
                <p className="text-sm font-medium line-clamp-3 text-primary">
                  {generatedPrompt}
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
