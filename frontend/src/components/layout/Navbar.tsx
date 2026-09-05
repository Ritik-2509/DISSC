import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight text-primary">DISCC</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link>
            <Link href="/our-work" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Our Work</Link>
            <Link href="/our-impact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Impact</Link>
            <Link href="/stories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Stories</Link>
            <Link href="/knowledge" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Knowledge</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/get-involved">
            <Button variant="ghost" className="hidden md:inline-flex">Get Involved</Button>
          </Link>
          <Link href="/donate">
            <Button>Donate</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
