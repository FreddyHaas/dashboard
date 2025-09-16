import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center py-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>peopleIX x Freddy</span>
            <span>|</span>
            <Link 
              href="https://github.com/FreddyHaas/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub repository"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M12 .296a12 12 0 0 0-3.794 23.4c.6.111.82-.261.82-.58 0-.287-.011-1.244-.017-2.257-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.606-2.665-.303-5.466-1.334-5.466-5.932 0-1.31.469-2.382 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.003 0c2.291-1.552 3.298-1.23 3.298-1.23.655 1.653.243 2.873.119 3.176.77.839 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.476 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.901-.015 3.293 0 .321.218.697.826.579A12 12 0 0 0 12 .296z" />
              </svg>
            </Link>
          </div>
    </footer>
  );
}
