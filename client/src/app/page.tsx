
'use client';

import { Dashboard } from '@/components/dashboard';

export default function Home() {
  return (
    <div className="font-sans px-8 flex flex-col gap-[32px] row-start-2 items-center justify-start h-full">
      <Dashboard></Dashboard>
    </div>
  );
}
