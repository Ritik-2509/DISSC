import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-xl tracking-tight">DISCC</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              DEVA International Society for Child Care.
              <br />
              Working across communities to ensure every child thrives.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Organisation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/about#leadership" className="hover:text-primary">Leadership</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Our Work</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/our-work#education" className="hover:text-primary">Child & Education</Link></li>
              <li><Link href="/our-work#sensitisation" className="hover:text-primary">Sensitisation</Link></li>
              <li><Link href="/our-work#community" className="hover:text-primary">Community</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Transparency</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/transparency#reports" className="hover:text-primary">Annual Reports</Link></li>
              <li><Link href="/transparency#financials" className="hover:text-primary">Financials</Link></li>
              <li><Link href="/transparency#policies" className="hover:text-primary">Policies</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DISCC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
