// File: InventorySelect.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component to choose a type of inventory

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// options for type selection

const TYPE_OPTIONS = [
  { value: "yarn", label: "Yarn" },
  { value: "hook_needle", label: "Hook/Needle" },
  { value: "other", label: "Other" },
];

// display a dropdown of item types to choose from
export function InventorySelect({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an item type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* mapping each option */}
          {TYPE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
