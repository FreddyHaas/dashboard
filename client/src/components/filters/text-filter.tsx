'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextFilterProps {
  label: string;
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: 'text' | 'email' | 'search';
}

export function TextFilter({
  label,
  value,
  onValueChange,
  placeholder = 'Enter text',
  className = 'min-w-[200px]',
  type = 'text',
}: TextFilterProps) {
  return (
    <div className={`flex ${className} flex-col gap-1`}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        type={type}
        value={value || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onValueChange(e.target.value)
        }
        placeholder={placeholder}
        className="h-9"
      />
    </div>
  );
}
