import Card from "./Card";
import Image from "next/image";
import { IAcademics } from "@/interfaces/i-professional";
import Pill from "./Pill";

export default function Academics({ data }: { data: IAcademics[] }) {
  return (
    <>
      {data.map((item, index) => (
        <Card key={index} className="p-3">
          <div className="flex flex-row gap-x-3">
            <div>
              <div className="w-[50px] h-[50px]">
                <Image
                  src={item?.institutionImage || "/placeholder.svg"}
                  width={50}
                  height={50}
                  alt={item.institutionName}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="grow flex flex-col">
              <h3 className="text-xl font-bold">
                {item.degree} <Pill classes="md:ml-2">{item.level}</Pill>
              </h3>
              <h3 className="text-lg">{item.institutionName}</h3>
              <em className="text-sm">
                {item.startYear} {!!item.endYear ? `- ${item.endYear}` : ``}
              </em>
              {item.marksObtained && item.marksOutOf && (
                <p className="text-sm">
                  Score : {item.marksObtained} / {item.marksOutOf}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
