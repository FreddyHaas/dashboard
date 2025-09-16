"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import * as React from "react";

interface FilterDropdownProps {
  children: React.ReactNode;
  triggerText?: string;
  align?: "start" | "center" | "end";
  className?: string;
  filterCount?: number;
}

export function FilterDropdown({ 
  children, 
  triggerText = undefined, 
  align = "end",
  className = "w-72 p-2",
  filterCount = 0
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 cursor-pointer flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          {triggerText && <span className="text-gray-600">{triggerText}</span>}
          {filterCount > 0 && (
            <Badge variant="secondary" className="h-5 w-5 p-0 text-xs">
              {filterCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className} align={align}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
