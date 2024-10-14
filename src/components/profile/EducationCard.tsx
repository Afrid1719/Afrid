import { LuPlus as Plus } from "react-icons/lu";
import { FiEdit as Edit } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Pill from "@/components/Pill";
import { useEffect, useState } from "react";
import { IAcademics } from "@/interfaces/i-professional";

export default function EducationTab() {
  const [academics, setAcademics] = useState<IAcademics[]>([]);

  useEffect(() => {
    async function getAcademics() {
      const data = await fetch(`/api/academics`);
      const json = await data.json();
      setAcademics(json);
    }

    getAcademics();
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-app-secondary text-app-primary hover:bg-app-secondary/70">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>
      {academics.map((academic) => (
        <EducationCard key={academic._id.toString()} data={academic} />
      ))}
    </>
  );
}

const EducationCard = ({ data }: { data: IAcademics }) => (
  <Card className="mb-4 border-app-color-5 bg-transparent text-app-secondary">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg">{data.degree}</CardTitle>
          <p className="text-app-tertiary">{data.institutionName}</p>
          <p className="text-app-tertiary">
            {data.startYear} {!!data.endYear ? `- ${data.endYear}` : ``}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-app-secondary hover:bg-white hover:text-app-primary"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Pill classes="pb-2">{data.level}</Pill>
        {data.marksObtained && data.marksOutOf && (
          <p className="text-sm mt-1">
            Score : {data.marksObtained} / {data.marksOutOf}
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);
