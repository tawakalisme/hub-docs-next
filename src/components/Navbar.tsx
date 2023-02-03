import Link from "next/link";
import Search from "./Search";

export default function Navbar({ className }: { className?: string }) {
  return (
    <div className={`bg-ycp-primary fixed top-0 z-10 w-full`}>
      <nav className="py-4 container">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-2 items-end">
            <Link href="/" className="font-serif text-white text-2xl font-bold">
              HUB <span className="text-xs font-sans font-normal">Docs</span>
            </Link>
            <code className="text-xs p-1 bg-white/10 rounded-sm text-white">
              v4.0
            </code>
          </div>
          <Search />
        </div>
      </nav>
    </div>
  );
}
