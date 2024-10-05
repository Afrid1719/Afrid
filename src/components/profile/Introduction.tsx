import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Edit
} from "lucide-react";
import { useState } from "react";
import Uploader from "@/components/Uploader";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { UploadApiResponse } from "cloudinary";

export default function Introduction({
  imageUrl,
  dataUrl
}: {
  imageUrl: string;
  dataUrl: any;
}) {
  return (
    <div className="text-center space-y-4">
      <AvatarSection imageUrl={imageUrl} dataUrl={dataUrl} />
      <div>
        <h1 className="text-3xl font-bold">Syed Afrid Ali</h1>
        <p className="text-xl">Full Stack Web Developer</p>
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          style={{ color: "#79c4f2", borderColor: "#79c4f2" }}
        >
          <Github className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          style={{ color: "#79c4f2", borderColor: "#79c4f2" }}
        >
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          style={{ color: "#79c4f2", borderColor: "#79c4f2" }}
        >
          <Twitter className="h-4 w-4" />
        </Button>
      </div>
      <div className="container flex flex-col sm:flex-row justify-center items-end space-x-2 space-y-2">
        <Badge
          variant="secondary"
          className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
        >
          <Mail className="w-4 h-4" /> john.doe@example.com
        </Badge>
        <Badge
          variant="secondary"
          className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
        >
          <Phone className="w-4 h-4" /> +1 (555) 123-4567
        </Badge>
        <Badge
          variant="secondary"
          className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
        >
          <MapPin className="w-4 h-4" /> San Francisco, CA
        </Badge>
      </div>
    </div>
  );
}

function AvatarSection({
  imageUrl,
  dataUrl
}: {
  imageUrl: string;
  dataUrl: any;
}) {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const session = useSession();
  const updateAdmin = async (data: any) => {
    try {
      const res: UploadApiResponse = await data[0].value.json();
      await fetch(`/api/admins/${session.data.user.id}`, {
        method: "PUT",
        body: JSON.stringify({
          imageUrl: res.secure_url
        })
      });
      toast.success("Profile image updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="block">
      <Avatar className="group w-40 h-40 md:w-64 md:h-64 mx-auto relative shadow-md">
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt="Afrid"
          placeholder="blur"
          blurDataURL={dataUrl.base64}
          className="shadow-xl shadow-slate-950 rounded-full w-40 h-40 md:w-64 md:h-64 object-fill aspect-auto group-hover:blur-lg transition-all ease-in-out duration-300"
        />
        <Button
          variant="secondary"
          size="icon"
          className="invisible group-hover:visible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-app-secondary"
          onClick={() => setIsUploaderOpen(true)}
        >
          <Edit className="h-6 w-6" />
        </Button>
      </Avatar>
      <Uploader
        title="Profile Image"
        isUploaderOpen={isUploaderOpen}
        setIsUploaderOpen={setIsUploaderOpen}
        acceptFileType="image/*"
        onUploadComplete={updateAdmin}
      />
    </div>
  );
}
