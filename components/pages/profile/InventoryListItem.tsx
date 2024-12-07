"use client";

import { FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InventoryItem } from "@/types/InventoryItem";

interface InventoryItemProps {
  item: InventoryItem;
}

export const InventoryListItem: FC<InventoryItemProps> = ({ item }) => {
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
          <div>
            <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
    </>
  );
};
