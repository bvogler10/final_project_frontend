"use client";

import PatternSearch from "@/components/pages/browse-patterns/PatternSearch";
import { PatternListItem } from "@/components/pages/home/PatternListItem";
import { Pattern } from "@/types/Pattern";
import { useEffect, useState } from "react";
import apiService from "../services/apiService";

export default function BrowsePatterns() {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery); // Update debounced value after delay
    }, 400); // 400ms debounce delay

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup
    };
  }, [searchQuery]); // Trigger when `searchQuery` changes

  useEffect(() => {
    const fetchSearchPatterns = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("search_query", debouncedSearchQuery);
        const searchParams = queryParams.toString();

        const fetchedPatterns = await apiService.get(
          `/api/patterns/search_patterns/?${searchParams}`
        );
        console.log('setting patterns as:', fetchedPatterns)

        setPatterns(fetchedPatterns.data);
      } catch (error) {
        console.error("Failed to fetch patterns:", error);
      }
    };

    void fetchSearchPatterns();
  }, [debouncedSearchQuery]);

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row bg-card p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Browse Patterns
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Search for patterns for your next project!
          </p>
        </div>
      </div>
      <PatternSearch
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
      />

      {patterns && patterns.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern) => (
            <PatternListItem
              key={pattern.id}
              pattern={pattern}
              isFollowing={false}
            />
          ))}
        </div>
      ) : (
        <p>No patterns found.</p>
      )}
    </>
  );
}
