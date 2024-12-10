// Define the PostList component

import { FC, useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { PatternListItem } from "./PatternListItem";
import { Pattern } from "@/types/Pattern";

interface PatternListProps {
  endpoint: string;
  isFollowing: boolean;
}

// a component for a list of patterns
export const PatternList: FC<PatternListProps> = ({
  endpoint,
  isFollowing,
}) => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      // fetch from the specified endpoint
      const tmpPatterns = await apiService.get(endpoint);

      setPatterns(tmpPatterns.data);
    };
    void getPosts();
  }, [endpoint]);

  return (
    // map each pattern item to its own styled item
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {patterns.map((pattern) => (
        <PatternListItem
          key={pattern.id}
          pattern={pattern}
          isFollowing={isFollowing}
        />
      ))}
    </div>
  );
};
