'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from 'next/navigation';
import { Pattern } from '@/types/Pattern';
import { getUserId } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';


export default function PatternDetailPage() {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const params = useParams();
  const pattern_id = Array.isArray(params.pattern_id)
    ? params.pattern_id[0]
    : params.pattern_id;
  console.log(pattern_id)

  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter(); 

  useEffect(() => {
    const getInfo = async () => {
      try {
        setIsLoading(true); // Start loading
        const patternData = await apiService.get(`/api/pattern/${pattern_id}`);
        setPattern(patternData.data);
      } catch (error) {
        console.error("Error fetching pattern data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    if (pattern_id) {
      getInfo();
    }
  }, [pattern_id]); // Add profile_id as a dependency

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  if (!pattern) {
    return <div>Pattern not found</div>; // Handle case where profile is not found
  }


  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{pattern.name}</h1>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={pattern.creator_info.avatar} alt={pattern.creator_info.name} />
              <AvatarFallback>{pattern.creator_info.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{pattern.creator_info.name}</p>
              <p className="text-sm text-muted-foreground">@{pattern.creator_info.username}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative w-full aspect-square">
            <Image
              src={pattern.image_url}
              alt={pattern.name}
              layout="fill"
              objectFit="cover"
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
            <div className={`relative ${isDescriptionExpanded ? '' : 'max-h-40 overflow-hidden'}`}>
              <p className="text-foreground whitespace-pre-wrap">{pattern.description}</p>
              {!isDescriptionExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={toggleDescription}
            >
              {isDescriptionExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Show More
                </>
              )}
            </Button>
          </div>

          
        </div>
      </div>
    </div>
  );
}

