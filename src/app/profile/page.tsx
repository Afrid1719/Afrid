import AdminProfile from "@/components/profile/AdminProfile";
import UserProfile from "@/components/UserProfile";
import { allowedUsers } from "@/utils/allowed-users";
import { local } from "@/utils/image-placeholder";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  const isAdmin = allowedUsers.includes(session?.user?.email);
  const imageUrl = isAdmin && "/me-intro-2-modified.png";
  const dataUrl: any = isAdmin && (await local(imageUrl));
  return isAdmin ? (
    <AdminProfile imageUrl={imageUrl} dataUrl={dataUrl} />
  ) : (
    <UserProfile />
  );
}
