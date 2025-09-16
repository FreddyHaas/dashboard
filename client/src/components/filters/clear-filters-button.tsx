'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ClearFiltersButtonProps {
  onClear: () => void;
  hasFilters: boolean;
  className?: string;
}

export function ClearFiltersButton({
  onClear,
  hasFilters,
  className = 'h-9 w-9 cursor-pointer',
}: ClearFiltersButtonProps) {
  if (!hasFilters) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={onClear}
      title="Clear Filters"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}
