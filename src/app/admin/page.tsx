import Login from "@/components/Login";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (session) return redirect("/");
  return (
    <div className="flex justify-center">
      <div className="p-8 rounded w-full sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12 md:bg-sky-700">
        <Login title="Admin Login" isAdmin={true} />
      </div>
    </div>
  );
}
