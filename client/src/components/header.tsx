import Image from 'next/image';

export function Header() {
  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Dashboard Logo"
              width={130}
              height={24}
              className="h-6 w-auto"
              priority
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Future navigation items can go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
