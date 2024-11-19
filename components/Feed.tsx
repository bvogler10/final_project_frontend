'use client';

import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

export const Feed: FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Feed</h2>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">John Doe</CardTitle>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <img src="/placeholder.svg?height=300&width=600" alt="Crochet project" className="w-full rounded-md" />
          <p className="mt-4">Just finished this beautiful blanket! 🧶 #crochet #blanket</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Like
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              Comment
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
