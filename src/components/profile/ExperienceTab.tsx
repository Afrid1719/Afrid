import { useCallback, useEffect, useState, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LuChevronDown as ChevronDown,
  LuChevronUp as ChevronUp,
  LuPlus as Plus,
  LuTrash2 as Trash2
} from "react-icons/lu";
import { FiEdit as Edit } from "react-icons/fi";
import { IExperience } from "@/interfaces/i-professional";
import moment from "moment";
import ExperienceFormWrapper from "../forms/ExperienceForm";
import ConfirmationDialog from "../ConfirmationDialog";
import toast from "react-hot-toast";

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [openAddExperienceForm, setOpenAddExperienceForm] =
    useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(undefined);

  const memoizedOpenFormHandle = useCallback((value: boolean) => {
    setOpenAddExperienceForm(value);
  }, []);

  const memoizedShouldFetch = useCallback((value: boolean) => {
    setShouldFetch(value);
  }, []);

  useEffect(() => {
    async function getExperiences() {
      const data = await fetch(`/api/experiences`);
      const json = await data.json();
      setExperiences(json);
    }

    if (shouldFetch || shouldFetch === undefined) {
      getExperiences();
    }

    return () => {
      setShouldFetch(false);
    };
  }, [shouldFetch]);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-app-secondary text-app-primary hover:bg-app-secondary/70"
          onClick={() => memoizedOpenFormHandle(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>
      {experiences.map((experience) => (
        <MemoizedExperienceCard
          key={experience._id.toString()}
          data={experience}
          setShouldFetch={memoizedShouldFetch}
        />
      ))}
      <ExperienceFormWrapper
        isExperienceFormOpen={openAddExperienceForm}
        setIsExperienceFormOpen={memoizedOpenFormHandle}
        onCancel={() => memoizedOpenFormHandle(false)}
        setShouldFetch={memoizedShouldFetch}
      />
    </>
  );
}

const ExperienceCard = ({
  data,
  setShouldFetch
}: {
  data: IExperience;
  setShouldFetch: (value: boolean) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openEditExperienceForm, setOpenEditExperienceForm] =
    useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const memoizedOpenFormHandle = useCallback((value: boolean) => {
    setOpenEditExperienceForm(value);
  }, []);

  const memoizedSetConfirmDelete = useCallback((value: boolean) => {
    setConfirmDelete(value);
  }, []);

  const onDelete = useCallback(async () => {
    const response = await fetch(`/api/experiences/${data._id.toString()}`, {
      method: "DELETE"
    });
    const json = await response.json();
    if (json?.error) {
      console.log(json.error);
      toast.error(json.error.message);
    } else {
      console.log(json);
      toast.success("Experience deleted successfully.");
      setShouldFetch(true);
    }
    setConfirmDelete(false);
  }, [data._id, setShouldFetch]);

  return (
    <>
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
                onClick={() => memoizedOpenFormHandle(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent text-app-color-5 hover:bg-white hover:text-app-primary"
                onClick={() => memoizedSetConfirmDelete(true)}
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
      <ExperienceFormWrapper
        isExperienceFormOpen={openEditExperienceForm}
        setIsExperienceFormOpen={memoizedOpenFormHandle}
        onCancel={() => memoizedOpenFormHandle(false)}
        experience={data}
        setShouldFetch={setShouldFetch}
      />
      <ConfirmationDialog
        title="Do you really want to delete this experience?"
        onConfirm={onDelete}
        confirmText="Yes, Delete"
        isOpen={confirmDelete}
        setIsOpen={memoizedSetConfirmDelete}
      />
    </>
  );
};

const MemoizedExperienceCard = memo(ExperienceCard);
