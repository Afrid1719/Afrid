import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type OverlayDialogProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function OverlayDialog({
  title,
  children,
  open,
  onOpenChange
}: React.PropsWithChildren<OverlayDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-app-primary/50 backdrop-blur-lg text-app-secondary w-5/6 m-2 h-[80%] mt-4 p-4 md:p-6 rounded-md ml-0">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[100%]">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
