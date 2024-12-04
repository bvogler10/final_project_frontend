"use client";

import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
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
      <Card className="w-96 border rounded-lg shadow">
        <CardHeader className="flex items-center">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-16 h-16 mr-4 rounded-full object-cover"
          />
          <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm">{item.descrption}</p>
        </CardContent>
        <CardFooter>
          <button className="text-blue-500 hover:underline">Learn more</button>
        </CardFooter>
      </Card>
    </>
  );
};
