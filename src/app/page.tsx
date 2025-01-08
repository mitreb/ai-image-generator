import ImageGenerator from './ImageGenerator';

export default function Home() {
  return (
    <div className="flex grow flex-col justify-center">
      <main className="text-center">
        <h1 className="text-3xl">AI Image Generator</h1>
        <ImageGenerator />
      </main>
    </div>
  );
}
