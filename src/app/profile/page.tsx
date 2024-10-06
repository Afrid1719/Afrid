import AdminProfile from "@/components/profile/AdminProfile";
import UserProfile from "@/components/UserProfile";
import { IAdminWOPassword } from "@/interfaces/i-admin";
import { getAdminByEmailOrId } from "@/models/Admin";
import { getUserByEmailOrId } from "@/models/User";
import { isAllowed } from "@/utils/access";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  const isAdmin = await isAllowed();
  let userData = isAdmin
    ? await getAdminByEmailOrId(session.user.email)
    : await getUserByEmailOrId(session.user.email);
  return isAdmin ? (
    <AdminProfile user={userData as IAdminWOPassword} />
  ) : (
    <UserProfile user={userData} />
  );
}
