"use client";

// File: patterns/[pattern_id]/page.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the page at the url /patterns/[pattern-id] which displays a pattern specified by pattern_id

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { Pattern } from "@/types/Pattern";
import apiService from "@/app/services/apiService";
import Link from "next/link";

//the page for pattern details
export default function PatternDetailPage() {
  // Get the pattern id from the URL
  const params = useParams();
  const pattern_id = Array.isArray(params.pattern_id)
    ? params.pattern_id[0]
    : params.pattern_id;

  const [pattern, setPattern] = useState<Pattern | null>(null); // to store pattern info
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getInfo = async () => {
      try {
        setIsLoading(true); // Start loading
        const patternData = await apiService.get(`/api/pattern/${pattern_id}`); //fetch pattern data
        setPattern(patternData.data); // save data
      } catch (error) {
        console.error("Error fetching pattern data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    if (pattern_id) {
      getInfo();
    }
  }, [pattern_id]); // pattern_id as a dependency

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  if (!pattern) {
    return <div>Pattern not found</div>; // Handle case where pattern is not found
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{pattern.name}</h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={pattern.creator_info.avatar}
                alt={pattern.creator_info.name}
              />
              <AvatarFallback>{pattern.creator_info.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              {/* link to user profile from creator name and username */}
            <Link
                href={`${window.location.origin}/profiles/${pattern.creator_info.id}`}
              >
              <p className="font-semibold">{pattern.creator_info.name}</p>
              
                <p className="text-sm text-muted-foreground">
                  @{pattern.creator_info.username}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative w-full aspect-square">
            <img
              src={pattern.image_url}
              alt={pattern.name}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Details</h2>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Difficulty:</span>
            <Badge variant="secondary">{pattern.difficulty}</Badge>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
            <p className="text-foreground whitespace-pre-wrap">
              {pattern.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
