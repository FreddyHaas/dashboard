"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";

interface FilterDropdownProps {
  children: React.ReactNode;
  triggerText?: string;
  align?: "start" | "center" | "end";
  className?: string;
}

export function FilterDropdown({ 
  children, 
  triggerText = "Filter", 
  align = "end",
  className = "w-72 p-2"
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 cursor-pointer">
          {triggerText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className} align={align}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
