"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Option<T = string> {
  value: T;
  label: string;
}

interface OptionFilterProps<T = string> {
  label: string;
  value?: T;
  onValueChange: (value: T) => void;
  options: Option<T>[];
  placeholder?: string;
  className?: string;
}

export function OptionFilter<T = string>({ 
  label,
  value,
  onValueChange, 
  options,
  placeholder = "Select option",
  className = "min-w-[200px]" 
}: OptionFilterProps<T>) {
  return (
    <div className={`flex ${className} flex-col gap-1`}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select 
        value={value ? String(value) : undefined} 
        onValueChange={(stringValue) => {
          const option = options.find(opt => String(opt.value) === stringValue);
          if (option) {
            onValueChange(option.value);
          }
        }}
      >
        <SelectTrigger className="h-9">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
