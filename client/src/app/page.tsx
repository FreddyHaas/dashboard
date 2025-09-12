
'use client';

import { Dashboard } from '@/components/dashboard';

export default function Home() {
  return (
    <div className="font-sans px-8">
        <main className="flex flex-col gap-[32px] row-start-2 items-center justify-start">
          <Dashboard></Dashboard>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        </footer>
    </div>
  );
}
