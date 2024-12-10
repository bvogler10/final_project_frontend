// File: ExplorePage.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component displaying explore content

import apiService from "@/app/services/apiService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InventorySelect } from "./InventorySelect";

interface CreateInventoryItemDialogProps {
  profile: User;
}

// Declare file restriction constants for file upload
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

//  schema for the inventory form
const inventorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  item_type: z.string().min(1, "Item type is required"),
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

type InventoryFormValues = z.infer<typeof inventorySchema>;

// component for dialog of inventory creation
export const CreateInventoryItemDialog: FC<CreateInventoryItemDialogProps> = ({
  profile,
}) => {
  const [isCreateInventoryOpen, setIsCreateInventoryOpen] = useState(false);
  const router = useRouter();
  // form instance with default values
  const inventoryForm = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      item_type: "",
      image: undefined,
    },
  });

  // upon submission create formdata with form values and send to backend
  const handleSubmit = async (data: InventoryFormValues) => {
    try {
      const userId = profile.id;
      const formData = new FormData();
      formData.append("user", userId);
      if (data.image) {
        formData.append("image", data.image);
      }
      formData.append("name", data.name);
      if (data.description) {
        formData.append("description", data.description);
      }
      formData.append("item_type", data.item_type);
      const response = await apiService.createPost(
        `/api/inventory/create_inventory/${userId}`,
        formData
      );

      if (response.message) {
        console.log("Response", response);
      }

      setIsCreateInventoryOpen(false);
      router.push(`/profiles/${userId}`);
    } catch (e) {
      console.log("error:", e);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          setIsCreateInventoryOpen(true);
        }}
        className="text-left"
      >
        Add Inventory
      </Button>
      <Dialog
        open={isCreateInventoryOpen}
        onOpenChange={setIsCreateInventoryOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Inventory Item</DialogTitle>
            <DialogDescription>
              Enter the details for your new inventory item!
            </DialogDescription>
          </DialogHeader>
          <Form {...inventoryForm}>
            <form
              onSubmit={inventoryForm.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={inventoryForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter item name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={inventoryForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter item description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={inventoryForm.control}
                name="item_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Type</FormLabel>
                    <FormControl>
                      <InventorySelect
                        value={field.value || undefined}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* handle an image */}
              <FormField
                control={inventoryForm.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept={ACCEPTED_FILE_TYPES.join(",")}
                        onChange={(e) =>
                          inventoryForm.setValue(
                            "image",
                            e.target.files?.[0] || undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create Item
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
