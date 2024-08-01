import Link from "next/link";

export const Unauthorized: React.FunctionComponent = () => {
  return (
    <div className="unauthorized-container w-100 flex flex-col justify-center h-[250px] md:h-[300px] lg:h-[400px] p-4">
      <div className="w-100 text-center">
        Thank you for visiting us. Unfortunately, this page is available for{" "}
        <strong>Afrid</strong> only. However, he left a gift for you if you
        click on the gift box (Upcoming).
        <br />
      </div>
    </div>
  );
};
