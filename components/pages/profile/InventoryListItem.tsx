"use client";

import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InventoryItem } from "@/types/InventoryItem";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

interface InventoryItemProps {
  item: InventoryItem;
}

export const InventoryListItem: FC<InventoryItemProps> = ({ item }) => {
  const router = useRouter()

  const handleDelete = async () => {
    const userId = item.user_info.id
    try {
      console.log("Delete item with id:", item.id);
      const response = await apiService.delete(`/api/inventory/delete_inventory/${item.id}`)
      if (response) {
        console.log("Delete Response:", response)
        router.push(`/profiles/${userId}`)
      }
      
    } catch (e) {
      console.error('Error:', e)
    }
    
  };

  return (
    <>
      <Card className="w-full border-none rounded-lg shadow">
      <CardHeader>
        <div className="flex items-start">
          {/* Image on the left */}
          <img
            src={item.image_url}
            alt={item.name}
            className="w-16 h-16 mr-4 rounded-lg object-cover"
          />
          {/* Text content stacked */}
          <div className="w-full">
            <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
          {/* Delete button */}
          <button
            onClick={() => handleDelete()}
            className="ml-4 text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </CardHeader>
    </Card>
    </>
  );
};
