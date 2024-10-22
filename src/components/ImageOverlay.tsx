import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";

type ImageOverlayProps = {
  title?: string;
  image: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ImageOverlay({
  image,
  open,
  onOpenChange,
  title = ""
}: React.PropsWithChildren<ImageOverlayProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {title && <DialogHeader>{title}</DialogHeader>}
      <DialogContent className="bg-[#111]/40 backdrop-blur-md max-w-none w-full h-[70vh] lg:h-[75vh] border-none flex justify-center items-center">
        <Image
          src={image}
          width={1920}
          height={1080}
          alt="Image"
          className="w-full max-h-full object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
