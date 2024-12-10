// File: PatternSearch.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a component to search patterns

import { Input } from "@/components/ui/input";

export default function PatternSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Input
      type="text"
      placeholder="What do you want to make?"
      value={value || ""}
      onChange={onChange}
      className="mb-4 h-10 text-card-foreground placeholder:text-muted"
    />
  );
}
