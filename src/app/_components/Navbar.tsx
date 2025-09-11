import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <div className="container px-4">
        <div className="flex items-center h-16">
          <div className="space-x-6">
            <Link href="/">
              Home
            </Link>
            <Link href="/posts">
              Posts
            </Link>
            <Link href="/projects">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}