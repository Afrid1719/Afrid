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
import { startTransition, useCallback, useState } from "react";
import Uploader from "@/components/Uploader";
import toast from "react-hot-toast";
import { UploadApiResponse } from "cloudinary";
import { IAdminWOPassword } from "@/interfaces/i-admin";

export default function Introduction({ user }: { user: IAdminWOPassword }) {
  return (
    <div className="text-center space-y-4">
      <AvatarSection user={user} />
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

function AvatarSection({ user }: { user: IAdminWOPassword }) {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [localUser, setLocalUser] = useState<IAdminWOPassword>(user);

  const memoizedSetIsUploaderOpen = useCallback(
    (value: boolean) => {
      setIsUploaderOpen(value);
    },
    [setIsUploaderOpen]
  );

  const updateAdmin = useCallback(
    async (data: any) => {
      try {
        const res: UploadApiResponse = await data[0].value.json();
        const response = await fetch(`/api/admins/${user.id}`, {
          method: "PUT",
          body: JSON.stringify({
            image: {
              assetId: res.asset_id,
              publicId: res.public_id,
              secureUrl: res.secure_url,
              url: res.secure_url,
              resourceType: res.resource_type,
              width: res.width,
              height: res.height
            }
          })
        });
        const updatedAdmin: IAdminWOPassword = await response.json();
        startTransition(() => {
          setLocalUser({ ...localUser, ...updatedAdmin });
        });
        toast.success("Profile image updated successfully");
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    },
    [user.id, localUser]
  );

  return (
    <div className="block">
      <Avatar className="group w-40 h-40 md:w-64 md:h-64 mx-auto relative shadow-md">
        <Image
          src={localUser.image?.secureUrl || ""}
          width={200}
          height={200}
          alt="Afrid"
          placeholder={!!localUser?.blurDataUrl ? "blur" : "empty"}
          blurDataURL={localUser?.blurDataUrl || ""}
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
        setIsUploaderOpen={memoizedSetIsUploaderOpen}
        acceptFileType="image/*"
        onUploadComplete={updateAdmin}
      />
    </div>
  );
}
