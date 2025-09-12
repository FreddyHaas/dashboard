
'use client';

import { Dashboard } from '@/components/dashboard';

// ToDo: Add footer
export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center justify-start">
          <Dashboard></Dashboard>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        </footer>
    </div>
  );
}
