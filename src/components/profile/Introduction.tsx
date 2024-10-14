import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FiEdit as Edit } from "react-icons/fi";
import {
  LuMail as Mail,
  LuPhone as Phone,
  LuMapPin as MapPin
} from "react-icons/lu";
import { startTransition, useCallback, useEffect, useState } from "react";
import Uploader from "@/components/Uploader";
import toast from "react-hot-toast";
import { UploadApiResponse } from "cloudinary";
import { IAdminWOPassword } from "@/interfaces/i-admin";
import InformationFormWrapper from "../forms/InformationForm";
import { SocialLinksList } from "@/utils/social-link-list";

export default function Introduction({ user }: { user: IAdminWOPassword }) {
  return (
    <div className="text-center space-y-4">
      <AvatarSection user={user} />
      <InformationSection user={user} />
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

function InformationSection({ user }: { user: IAdminWOPassword }) {
  const [open, setOpen] = useState(undefined);
  const [adminData, setAdminData] = useState(user);
  const [shouldFetch, setShouldFetch] = useState<boolean>(undefined);

  const memoizedSetOpen = useCallback(
    (value: boolean) => {
      setOpen(value);
    },
    [setOpen]
  );

  const memoizedShouldFetch = useCallback((value: boolean) => {
    setShouldFetch(value);
  }, []);

  useEffect(() => {
    async function getAdminInfo() {
      const data = await fetch(`/api/admins/${user.id}`);
      const json = await data.json();
      setAdminData(json);
    }

    if (shouldFetch || shouldFetch === undefined) {
      getAdminInfo();
    }

    return () => {
      setShouldFetch(false);
    };
  }, [user.id, shouldFetch]);

  return (
    <div className="group border border-transparent hover:border-app-secondary rounded-md space-y-4 p-4 relative ease-in duration-200">
      <Button
        variant="ghost"
        size="icon"
        className="invisible group-hover:visible bg-transparent text-app-color-5 hover:bg-white hover:text-app-primary absolute top-2 right-2"
        onClick={() => setOpen(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold">{adminData.name}</h1>
        <p className="text-xl">{adminData.title}</p>
      </div>
      <div className="flex justify-center space-x-4">
        {adminData.socialLinks.map((socialLink, index) => {
          const { name } = socialLink;
          const SocialIcon = SocialLinksList[name];
          return (
            <Button
              key={`${socialLink.name}-${index}`}
              variant="outline"
              size="icon"
              className="text-app-secondary border-app-secondary bg-transparent hover:bg-white hover:text-app-primary"
            >
              {SocialIcon}
            </Button>
          );
        })}
      </div>
      <div className="container flex flex-col sm:flex-row justify-center items-center space-x-2 space-y-2 md:space-y-0">
        <Badge
          variant="secondary"
          className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
        >
          <Mail className="w-4 h-4" /> {adminData.email}
        </Badge>
        <Badge
          variant="secondary"
          className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
        >
          <Phone className="w-4 h-4" /> {adminData.phone}
        </Badge>
        <Badge
          variant="secondary"
          className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
        >
          <MapPin className="w-4 h-4" /> {adminData.location}
        </Badge>
      </div>
      <InformationFormWrapper
        isInformationFormOpen={open}
        user={adminData}
        setIsInformationFormOpen={memoizedSetOpen}
        setShouldFetch={memoizedShouldFetch}
      />
    </div>
  );
}
