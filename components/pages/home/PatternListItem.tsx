import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pattern } from '@/types/Pattern';

interface PatternData {
  id: string;
  created_at: string;
  creator_info: {
    id: string;
    avatar: string;
    name: string;
    username: string;
  };
  difficulty: string;
  name: string;
  description: string;
  image_url: string;
}

interface PatternListItemProps {
  pattern: Pattern;
}

export const PatternListItem: React.FC<PatternListItemProps> = ({ pattern }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer border-none hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={pattern.creator_info.avatar} alt={pattern.creator_info.name} />
              <AvatarFallback>{pattern.creator_info.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{pattern.name}</CardTitle>
              <p className="text-sm text-muted-foreground">by {pattern.creator_info.username}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-video mb-4">
              <Image
                src={pattern.image_url}
                alt={pattern.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <Badge variant="secondary">{pattern.difficulty}</Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="pr-6"> {/* Add right padding to account for scrollbar */}
          <DialogHeader>
            <DialogTitle>{pattern.name}</DialogTitle>
            <DialogDescription>
              by {pattern.creator_info.name} ({pattern.creator_info.username})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <div className={`relative ${isDescriptionExpanded ? '' : 'max-h-40 overflow-hidden'}`}>
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
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <Badge variant="secondary">{pattern.difficulty}</Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

