export default function GreetingsSkeleton() {
  return (
    <div className="w-full p-4 md:p-5">
      <div className="h-24 md:h-36 w-3/4 md:w-full p-3 mx-auto bg-app-primary rounded-md shadow-md">
        <div className="w-full h-full rounded bg-slate-400 animate-pulse"></div>
      </div>
    </div>
  );
}
