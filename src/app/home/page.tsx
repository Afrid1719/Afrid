import Greetings from "@/components/Greetings";
import Introduction from "@/components/Introduction";

export default function Page() {
  return (
    <div className="flex flex-col w-full md:w-4/5 lg:w-3/4 max-w-7xl mx-auto">
      <Greetings />
      <Introduction />
    </div>
  );
}
