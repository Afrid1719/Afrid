import Login from "@/components/Login";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/");
  return (
    <div className="flex justify-center">
      <div className="p-8 rounded w-full sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12 md:bg-app-primary">
        <Login title="Login" />
      </div>
    </div>
  );
}
