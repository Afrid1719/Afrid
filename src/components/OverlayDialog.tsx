import React, { useState } from "react";
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
  disableOutsideClose?: boolean;
};

export default function OverlayDialog({
  title,
  children,
  open,
  onOpenChange,
  disableOutsideClose = false
}: React.PropsWithChildren<OverlayDialogProps>) {
  const [startZoom, setStartZoom] = useState<boolean>(false);
  const handleOutsideClick = (event: Event) => {
    if (!disableOutsideClose) return;
    event.preventDefault();
    if (!startZoom) {
      setStartZoom(true);
      setTimeout(() => {
        setStartZoom(false);
      }, 500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`bg-app-primary/50 backdrop-blur-lg text-app-secondary w-5/6 m-2 h-[80%] mt-4 p-4 md:p-6 rounded-md ml-0 z-[150] ${startZoom ? "outside-not-clickable" : "outside-clickable"}`}
        onPointerDownOutside={handleOutsideClick}
        onEscapeKeyDown={handleOutsideClick}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[100%]">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
