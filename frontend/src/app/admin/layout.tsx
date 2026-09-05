import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-background border-r flex flex-col p-4 space-y-6 shrink-0">
        <div className="font-bold text-xl tracking-tight text-primary px-4">
          DISCC Admin
        </div>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
          </Link>
          <Link href="/admin/blogs">
            <Button variant="ghost" className="w-full justify-start">Manage Blogs</Button>
          </Link>
          <Link href="/admin/pages">
            <Button variant="ghost" className="w-full justify-start">Manage Pages</Button>
          </Link>
          <Link href="/admin/gallery">
            <Button variant="ghost" className="w-full justify-start">Manage Gallery</Button>
          </Link>
          <Link href="/admin/teams">
            <Button variant="ghost" className="w-full justify-start">Manage Teams</Button>
          </Link>
          <Link href="/admin/testimonials">
            <Button variant="ghost" className="w-full justify-start">Testimonials</Button>
          </Link>
          <Link href="/admin/careers">
            <Button variant="ghost" className="w-full justify-start">Careers</Button>
          </Link>
          <Link href="/admin/faqs">
            <Button variant="ghost" className="w-full justify-start">Manage FAQs</Button>
          </Link>
          <Link href="/admin/contact">
            <Button variant="ghost" className="w-full justify-start">Contact Entries</Button>
          </Link>
        </nav>
        <div className="mt-auto px-4">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start text-xs">Back to Site</Button>
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
