import { AlertCircle } from 'lucide-react';

interface ChartErrorStateProps {
  error: string;
}

export function ChartErrorState({ error }: ChartErrorStateProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center space-y-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="text-sm text-destructive">Error: {error}</p>
      </div>
    </div>
  );
}
