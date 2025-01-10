import ImageGenerator from './ImageGenerator';

export default function Home() {
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 px-3 py-12 text-center">
        <h1 className="text-3xl font-bold">Create amazing images with AI</h1>
        <p className="text-sm text-muted-foreground">
          Generate an image using AI based on a prompt
        </p>
      </header>
      <main className="grow mx-auto w-full max-w-7xl px-5">
        <div className="w-full max-w-xl mx-auto">
          <ImageGenerator />
        </div>
      </main>
    </div>
  );
}
