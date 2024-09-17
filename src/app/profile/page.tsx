import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  return (
    <div>
      <span>{session?.user?.name}</span>
      <span>{session?.user?.email}</span>
      <Image
        src={session?.user?.image}
        width={100}
        height={100}
        alt={session?.user?.name}
        priority={true}
      />
    </div>
  );
}
