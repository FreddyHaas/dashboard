"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface NumberFilterProps {
  label: string;
  value?: number;
  onValueChange: (value: number | undefined) => void;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number;
}

export function NumberFilter({ 
  label,
  value,
  onValueChange, 
  className = "min-w-[200px]",
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
}: NumberFilterProps) {
  const handleValueChange = (values: number[]) => {
    const newValue = values[0];
    onValueChange(newValue);
  };

  return (
    <div className={`flex ${className} flex-col gap-2`}>
      <div className="flex justify-between items-center">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs text-muted-foreground">
          {value !== undefined ? value : defaultValue}
        </span>
      </div>
      <Slider
        value={value !== undefined ? [value] : [defaultValue]}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        className="w-full py-2"
      />
    </div>
  );
}
