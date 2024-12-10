
// File: InventoryList.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the component showing the list of components

import { FC, useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import { InventoryItem } from "@/types/InventoryItem";
import { InventoryListItem } from "./InventoryListItem";
import { getUserId } from "@/app/lib/actions";

// component for inventory list
export const InventoryList: FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const getInventory = async () => {
      // fetch the inventory
      const userId = await getUserId();
      const tmpInventory = await apiService.get(`/api/inventory/${userId}`);

      setInventory(tmpInventory.data);
    };
    void getInventory();
  }, []);

  // map the items
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {inventory.map((item) => (
        <InventoryListItem key={item.id} item={item} />
      ))}
    </div>
  );
};
