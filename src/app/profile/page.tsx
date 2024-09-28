import AdminProfile from "@/components/AdminProfile";
import UserProfile from "@/components/UserProfile";
import { allowedUsers } from "@/utils/allowed-users";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  const isAdmin = allowedUsers.includes(session?.user?.email);
  return isAdmin ? <AdminProfile /> : <UserProfile />;
}
