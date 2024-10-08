import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit, Plus, Trash2 } from "lucide-react";
import { IExperience } from "@/interfaces/i-professional";
import moment from "moment";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ExperienceFormWrapper from "../forms/ExperienceForm";

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isExperienceFormOpen, setIsExperienceFormOpen] =
    useState<boolean>(false);

  useEffect(() => {
    async function getExperiences() {
      const data = await fetch(`/api/experiences`);
      const json = await data.json();
      setExperiences(json);
    }

    getExperiences();
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-app-secondary text-app-primary hover:bg-app-secondary/70"
          onClick={() => setIsExperienceFormOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>
      {experiences.map((experience) => (
        <ExperienceCard key={experience._id.toString()} data={experience} />
      ))}
      <Dialog
        open={isExperienceFormOpen}
        onOpenChange={setIsExperienceFormOpen}
      >
        <DialogContent className="bg-app-primary/50 backdrop-blur-lg text-app-secondary m-2 mt-4 overflow-y-auto w-3/4 p-4 md:p-6 rounded-md">
          <DialogHeader>
            <DialogTitle>
              {true ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
          </DialogHeader>
          <ExperienceFormWrapper />
        </DialogContent>
      </Dialog>
    </>
  );
}

const ExperienceCard = ({ data }: { data: IExperience }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4 border border-app-color-5 bg-transparent text-app-secondary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semi-bold">
              {data.position}
            </CardTitle>
            <p className="text-app-tertiary">
              {data.company} | {moment(data.startDate).format("MMMM YYYY")} -{" "}
              {data.endDate
                ? moment(data.endDate).format("MMMM YYYY")
                : "Present"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent text-app-color-5 hover:bg-white hover:text-app-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent text-app-color-5 hover:bg-white hover:text-app-primary"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{data.techs.join(", ")}</p>
        {isExpanded && (
          <ul className="list-disc list-inside text-sm marker:text-app-tertiary text-white">
            {data.description.map((desc, idx) => (
              <li key={data._id.toString() + idx}>{desc}</li>
            ))}
          </ul>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-app-secondary hover:bg-white hover:text-app-primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Show More
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
