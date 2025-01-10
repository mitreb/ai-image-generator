'use client';
import ThemeToggle from '@/components/ThemeToggle';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Logo" width={35} height={35} />
          <span className="text-xl font-bold tracking-tight">
            AI Image Generator
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
