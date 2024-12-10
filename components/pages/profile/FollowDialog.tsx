import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { FollowList } from "./FollowList";
import { Follow } from "@/types/Follow";

interface FollowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  list: Follow[]; // Adjust type as needed
}
// dialog to show follows
export const FollowDialog: FC<FollowDialogProps> = ({
  isOpen,
  onClose,
  title,
  list,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FollowList follows={list} />
      </DialogContent>
    </Dialog>
  );
};
