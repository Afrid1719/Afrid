import UnderDevelopment from "@/components/UnderDevelopment";

export default function Page() {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center w-full h-full">
      <UnderDevelopment />
      <div className="w-4/5 text-center">
        The page is under development. Please visit after some time.
      </div>
    </div>
  );
}
