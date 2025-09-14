import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 lg:px-8 pt-2">
        <div className="flex h-8 items-center justify-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>peopleIX x Freddy</span>
            <span>|</span>
            <Link 
              href="https://github.com/FreddyHaas/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              GitHub repo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
