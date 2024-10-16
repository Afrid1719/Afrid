"use client";
import { LuPlus as Plus, LuTrash2 as Trash2 } from "react-icons/lu";
import { FiEdit as Edit } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Pill from "@/components/Pill";
import { memo, useCallback, useEffect, useState } from "react";
import { IAcademics } from "@/interfaces/i-professional";
import AcademicsFormWrapper from "@/components/forms/AcademicsForm";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import toast from "react-hot-toast";

export default function AcademicsTab() {
  const [academics, setAcademics] = useState<IAcademics[]>([]);
  const [openAddAcademicsForm, setOpenAddAcademicsForm] =
    useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(undefined);

  const memoizedOpenFormHandle = useCallback((value: boolean) => {
    setOpenAddAcademicsForm(value);
  }, []);

  const memoizedShouldFetch = useCallback((value: boolean) => {
    setShouldFetch(value);
  }, []);

  useEffect(() => {
    async function getAcademics() {
      const data = await fetch(`/api/academics`, {
        next: { tags: ["profile.academics"] }
      });
      const json = await data.json();
      setAcademics(json);
    }

    if (shouldFetch || shouldFetch === undefined) {
      getAcademics();
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
          Add Academics
        </Button>
      </div>
      {academics.map((academic) => (
        <MemoizedAcademicsCard
          key={academic._id.toString()}
          data={academic}
          setShouldFetch={memoizedShouldFetch}
        />
      ))}
      <AcademicsFormWrapper
        isAcademicsFormOpen={openAddAcademicsForm}
        setIsAcademicsFormOpen={memoizedOpenFormHandle}
        setShouldFetch={memoizedShouldFetch}
      />
    </>
  );
}

const AcademicsCard = ({
  data,
  setShouldFetch
}: {
  data: IAcademics;
  setShouldFetch: (value: boolean) => void;
}) => {
  const [openEditAcademicsForm, setOpenEditAcademicsForm] =
    useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const memoizedOpenFormHandle = useCallback((value: boolean) => {
    setOpenEditAcademicsForm(value);
  }, []);

  const memoizedSetConfirmDelete = useCallback((value: boolean) => {
    setConfirmDelete(value);
  }, []);

  const onDelete = useCallback(async () => {
    const response = await fetch(`/api/academics/${data._id.toString()}`, {
      method: "DELETE"
    });
    const json = await response.json();
    if (json?.error) {
      console.log(json.error);
      toast.error(json.error.message);
    } else {
      console.log(json);
      toast.success("Academics deleted successfully.");
      setShouldFetch(true);
    }
    setConfirmDelete(false);
  }, [data._id, setShouldFetch]);

  return (
    <>
      <Card className="mb-4 border-app-color-5 bg-transparent text-app-secondary">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{data.degree}</CardTitle>
              <p className="text-app-tertiary">{data.institutionName}</p>
              <p className="text-app-tertiary text-sm">
                {data.startYear} {!!data.endYear ? `- ${data.endYear}` : ``}
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
      <AcademicsFormWrapper
        isAcademicsFormOpen={openEditAcademicsForm}
        setIsAcademicsFormOpen={memoizedOpenFormHandle}
        setShouldFetch={setShouldFetch}
        academics={data}
      />
      <ConfirmationDialog
        title="Do you really want to delete this academics?"
        onConfirm={onDelete}
        confirmText="Yes, Delete"
        isOpen={confirmDelete}
        setIsOpen={memoizedSetConfirmDelete}
      />
    </>
  );
};

const MemoizedAcademicsCard = memo(AcademicsCard);
