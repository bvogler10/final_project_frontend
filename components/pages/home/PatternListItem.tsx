// File: PatternListItem.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component that makes up a single pattern object in the list

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pattern } from "@/types/Pattern";
import apiService from "@/app/services/apiService";
import Link from "next/link";

interface PatternListItemProps {
  pattern: Pattern;
  isFollowing: boolean;
}

// an item in a pattern list
export const PatternListItem: React.FC<PatternListItemProps> = ({
  pattern,
  isFollowing,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); //state for dialog description

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  // each pattern has a follow button to follow users, so initiate a follow
  const handleFollow = async () => {
    const otherUser = pattern.creator_info.id;
    try {
      console.log("following", otherUser);
      const response = await apiService.follow(`/api/user/follow/${otherUser}`);
      if (response) {
        console.log("Follow Response:", response);
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    // dialog component
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer border-none hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage
                src={pattern.creator_info.avatar}
                alt={pattern.creator_info.name}
              />
              <AvatarFallback>{pattern.creator_info.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{pattern.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                by {pattern.creator_info.username}
              </p>
            </div>
            {/* follow button */}
            {!isFollowing && (
              <Button
                onClick={() => handleFollow()}
                size="sm"
                className="ml-auto bg-secondary"
              >
                Follow
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-video mb-4">
              <img
                src={pattern.image_url}
                alt={pattern.name}
                width="300"
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <Badge variant="secondary">{pattern.difficulty}</Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="pr-6">
          {" "}
          {/* Add right padding to account for scrollbar */}
          <DialogHeader>
            <DialogTitle>{pattern.name}</DialogTitle>
            <DialogDescription>
              by {pattern.creator_info.name} ({pattern.creator_info.username})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="mt-2">
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <Badge variant="secondary">{pattern.difficulty}</Badge>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <div
                // toggle the expansion of the description
                className={`relative ${
                  isDescriptionExpanded ? "" : "max-h-40 overflow-hidden"
                }`}
              >
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {pattern.description}
                </p>
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

            <div className="mt-4">
              {/* navigate to a pattern's own page */}
              <Link href={`${window.location.origin}/patterns/${pattern.id}`}>
                <Button>Go to Pattern Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
