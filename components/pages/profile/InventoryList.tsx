// Define the PostList component

import { FC, useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { InventoryItem } from "@/types/InventoryItem";
import { InventoryListItem } from "./InventoryListItem";
import { getUserId } from "@/app/lib/actions";

export const InventoryList: FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const getPosts = async () => {
    const userId = await getUserId()
    const tmpInventory = await apiService.get(`/api/inventory/${userId}`);
    
    setInventory(tmpInventory.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {inventory.map((item) => (
        <InventoryListItem key={item.id} item={item} />
      ))}
    </div>
  );
};