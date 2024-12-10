// File: PatternDifficultySelect.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component to select a difficulty from a dropdown

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// options for the dropdown with value and label
const DIFFICULTY_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "advanced_beginner", label: "Advanced Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

export function PatternDifficultySelect({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  return (
    // selection compoent (dropdown)
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* map each option to a select item */}
          {DIFFICULTY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
