// Define the PostList component

import { FC, useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { PostListItem } from "./PostListItem";
import { Post } from "@/types/Post";
import { PatternListItem } from "./PatternListItem";
import { Pattern } from "@/types/Pattern";

interface PatternListProps {
  endpoint: string;
}

export const PatternList: FC<PatternListProps> = ({ endpoint }) => {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const getPosts = async () => {
    const tmpPatterns = await apiService.get(endpoint);

    setPatterns(tmpPatterns.data);
  };

  useEffect(() => {
    getPosts();
  }, [endpoint]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {patterns.map((pattern) => (
        <PatternListItem key={pattern.id} pattern={pattern}/>
      ))}
    </div>
  );
};
