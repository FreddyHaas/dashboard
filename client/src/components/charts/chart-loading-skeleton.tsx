import { Loader2 } from 'lucide-react';

export function ChartLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading data...</p>
      </div>
    </div>
  );
}
