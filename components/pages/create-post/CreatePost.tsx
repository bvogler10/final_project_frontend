"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Heart, MessageCircle, Bookmark } from "lucide-react";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

export default function CreatePost() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [pattern, setPattern] = useState("");
  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file); // Generate a preview URL
      setPreviewImage(previewUrl); // Generate a preview URL
    }
  };

  const handleSubmit = async () => {
    
      const formData = new FormData();
      const user = await getUserId();
      if (caption) {
        formData.append("caption", caption);
      }
      if (user) {
        formData.append("user", user);
      }
      
      if (image) {
        formData.append("image", image);
      }

      const response = await apiService.createPost(
        "/api/posts/create_post",
        formData
      );
      console.log("Response", response);
    // Here you would typically send the data to your backend
    console.log({ image, caption });
    // For now, we'll just simulate a post creation and redirect

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="container w-[700px] mx-auto py-8 justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="image">Upload Photo</Label>
                    <div className="mt-1 flex items-center justify-center w-full">
                      {previewImage ? (
                        <div className="relative w-full h-[600px] aspect-square">
                          <Image
                            src={previewImage}
                            alt="Uploaded image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setImage(null);
                              setPreviewImage("");
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor="image-upload"
                          className="w-full cursor-pointer"
                        >
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              Upload a photo
                            </span>
                          </div>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="caption">Caption</Label>
                    <Input
                      id="caption"
                      placeholder="Write a caption for your post..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pattern">Pattern Link (Optional)</Label>
                    <Input
                      id="pattern"
                      type="url"
                      placeholder="https://example.com/pattern"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="preview" className="flex items-center justify-center">
              <Card className="w-[550px]">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">@username</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  {previewImage && (
                    <div className="relative w-[500px] h-[500px] aspect-square mb-4">
                      <Image
                        src={previewImage}
                        alt="Post preview"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <p className="mb-2 text-sm">
                    {caption || "Your caption will appear here"}
                  </p>
                  {pattern && (
                    <p className="text-sm text-blue-500 hover:underline">
                      <a
                        href={pattern}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Pattern
                      </a>
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-xs">0 Likes</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">Comment</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4 mr-1" />
                    <span className="text-xs">Save</span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
