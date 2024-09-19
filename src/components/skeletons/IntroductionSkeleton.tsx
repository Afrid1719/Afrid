export default function IntroductionSkeleton() {
  return (
    <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
      <div className="w-full flex flex-col justify-center items-center md:flex-row gap-y-4">
        <section className="w-full flex justify-center items-center gap-3 md:flex-col md:w-1/2">
          <div className="shadow-xl shadow-slate-950 rounded-full bg-app-primary w-40 h-40 md:w-64 md:h-64 animate-pulse"></div>
          <div className="w-2/4 h-10 bg-app-primary py-2 px-2 sm:px-4 rounded-lg md:mt-4 animate-pulse"></div>
        </section>
        <section className="w-full md:w-1/2 h-full flex flex-col justify-around bg-app-primary rounded-lg p-3 gap-y-2">
          <div className="w-full h-6 bg-slate-400 rounded animate-pulse"></div>
          <div className="w-2/4 h-6 bg-slate-400 rounded animate-pulse"></div>
          <div className="w-3/4 h-6 bg-slate-400 rounded animate-pulse"></div>
          <div className="w-full h-6 bg-slate-400 rounded animate-pulse"></div>
          <div className="w-3/4 h-6 bg-slate-400 rounded animate-pulse"></div>
          <div className="w-full h-6 bg-slate-400 rounded animate-pulse"></div>
          <div className="w-2/4 h-6 bg-slate-400 rounded animate-pulse"></div>
          <div className="w-3/4 h-6 bg-slate-400 rounded animate-pulse"></div>
        </section>
      </div>
    </div>
  );
}
