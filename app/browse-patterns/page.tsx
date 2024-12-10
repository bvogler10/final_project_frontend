"use client";

import PatternSearch from "@/components/pages/browse-patterns/PatternSearch";
import { PatternListItem } from "@/components/pages/home/PatternListItem";
import { Pattern } from "@/types/Pattern";
import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { getUserId } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function BrowsePatterns() {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [user, setUser] = useState<string | null>();
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const getInfo = async () => {
      const userId = await getUserId();
      setUser(userId);
    };
    getInfo();
  }, []);

  useEffect(() => {
    // Redirect to home page if user is not valid
    if (user === null) {
      router.push("/"); // Redirect to home
    }
  }, [user, router]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      // put a 400ms delay to prevent calling the database every time a letter is typed
      setDebouncedSearchQuery(searchQuery); // Update debounced value after delay
    }, 400); // 400ms debounce delay

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup
    };
  }, [searchQuery]); // Trigger when `searchQuery` changes

  useEffect(() => {
    const fetchSearchPatterns = async () => {
      try {
        // create search parameters using the delayed search query and fetch
        const queryParams = new URLSearchParams();
        queryParams.append("search_query", debouncedSearchQuery);
        const searchParams = queryParams.toString();

        const fetchedPatterns = await apiService.get(
          `/api/patterns/search_patterns/?${searchParams}`
        );
        console.log("setting patterns as:", fetchedPatterns);
        // set the data received to the patterns
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
      <div className="w-full max-w-xl mx-auto">
        <PatternSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
      </div>
      {/* show the patterns once fetched */}
      {patterns && patterns.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern) => (
            <PatternListItem
              key={pattern.id}
              pattern={pattern}
              isFollowing={true}
            />
          ))}
        </div>
      ) : (
        <p>No patterns found.</p>
      )}
    </>
  );
}
