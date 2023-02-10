import Link from "next/link";
import Search from "./Search";

export default function Navbar({ className }: { className?: string }) {
  return (
    <div className={`fixed top-0 z-10 w-full bg-ycp-primary`}>
      <nav className="container py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-end gap-2">
            <Link href="/" className="font-serif text-2xl font-bold text-white">
              HUB <span className="font-sans text-xs font-normal">Docs</span>
            </Link>
            <code className="rounded-sm bg-white/10 p-1 text-xs text-white">
              v4.0
            </code>
          </div>
          <Search />
        </div>
      </nav>
    </div>
  );
}
