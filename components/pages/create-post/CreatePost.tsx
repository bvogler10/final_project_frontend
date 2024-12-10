"use client";

// File: CreatePost.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the post creation form component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

// Set up the schema for the form
const postSchema = z.object({
  caption: z.string().optional(),
  image: z
    .any()
    .refine((file) => file instanceof File || file === undefined, {
      message: "Please upload a valid file.",
    })
    .refine((file) => (file ? file.size <= MAX_FILE_SIZE : true), {
      message: `File size must be less than ${
        MAX_FILE_SIZE / (1024 * 1024)
      } MB`,
    })
    .refine((file) => (file ? ACCEPTED_FILE_TYPES.includes(file.type) : true), {
      message: `Invalid file type. Accepted types are: ${ACCEPTED_FILE_TYPES.join(
        ", "
      )}`,
    }),
});

// Type for the post form values
type PostFormValues = z.infer<typeof postSchema>;

export default function CreatePost() {
  const [previewImage, setPreviewImage] = useState<string | null>(null); //store preview URL
  const [caption, setCaption] = useState<string | null>(null);
  const router = useRouter();
  // form instance 
  const postForm = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: "onSubmit",
    defaultValues: {
      caption: "",
      image: undefined,
    },
  });

  // handle an image being uploaded
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Generate a preview URL
      setPreviewImage(previewUrl); // Generate a preview URL
    }
  };
  // upon submission, create and send form data
  const handleSubmit = async (data: PostFormValues) => {
    const formData = new FormData();
    const user = await getUserId();
    if (data.caption) {
      formData.append("caption", data.caption);
    }
    if (user) {
      formData.append("user", user);
    }

    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await apiService.createPost(
      "/api/posts/create_post",
      formData
    );
    console.log("Response", response);
    // navigate to home
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="container w-full max-w-[700px] mx-auto py-8 justify-center items-center">
      <Card className="w-full border-none">
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
              {/* form fields */}
              <Form {...postForm}>
                <form
                  onSubmit={postForm.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={postForm.control}
                    name="image"
                    render={() => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept={ACCEPTED_FILE_TYPES.join(",")}
                            onChange={(e) => {
                              postForm.setValue(
                                "image",
                                e.target.files?.[0] || undefined
                              );
                              handleImageUpload(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={postForm.control}
                    name="caption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caption</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter caption"
                            {...field} // Spread the necessary props from the form control
                            onChange={(e) => {
                              // Update the form value using field.onChange
                              field.onChange(e);

                              // Update the local state for preview
                              setCaption(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Create Post
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent
              value="preview"
              className="flex items-center justify-center"
            >
              <Card className="w-full max-w-[550px] border-none bg-background">
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
                  <p className="mb-2 text-sm">
                    {caption || "Your caption will appear here"}
                  </p>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
