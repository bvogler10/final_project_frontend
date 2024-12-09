"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { PlusSquare, Upload, X } from "lucide-react";
import apiService from "@/app/services/apiService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PatternDifficultySelect } from "./PatternDifficultySelect";

interface CreatePatternProps {
  profile: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

const patternSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description cannot be empty"),
  difficulty: z.string().min(1, "Difficulty is required"),
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

type PatternFormValues = z.infer<typeof patternSchema>;

export const CreatePattern: React.FC<CreatePatternProps> = ({ profile }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<PatternFormValues>({
    resolver: zodResolver(patternSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      difficulty: "",
      image: undefined,
    },
  });

  const handleSubmit = async (data: PatternFormValues) => {
    try {
      const userId = profile;
      const formData = new FormData();
      formData.append("creator", userId);
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("difficulty", data.difficulty);

      const response = await apiService.createPost(
        `/api/patterns/create_pattern/${userId}`,
        formData
      );

      if (response.message) {
        console.log("Response", response);
      }

      router.push(`/profiles/${userId}`);
    } catch (e) {
      console.log("error:", e);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create New Pattern
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pattern Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pattern name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide instructions for this pattern..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <PatternDifficultySelect
                    value={field.value || undefined}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Pattern Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      {imagePreview ? (
                        <div className="relative w-full aspect-square">
                          <Image
                            src={imagePreview}
                            alt="Pattern preview"
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
                              setImagePreview(null);
                              form.setValue("image", undefined);
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
                              Upload a photo of your pattern
                            </span>
                          </div>
                          <Input
                            id="image-upload"
                            type="file"
                            accept={ACCEPTED_FILE_TYPES.join(",")}
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={form.handleSubmit(handleSubmit)} className="w-full">
          <PlusSquare className="w-4 h-4 mr-2" />
          Create Pattern
        </Button>
      </CardFooter>
    </Card>
  );
};
