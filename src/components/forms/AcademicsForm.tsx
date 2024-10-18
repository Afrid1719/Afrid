import { IAcademics } from "@/interfaces/i-professional";
import OverlayDialog from "@/components/OverlayDialog";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zAcademicsCreateRequest } from "@/schemas/z-academics";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AcademicLevel } from "@/enums/academic-level";
import { LuLoader2 as Loader2 } from "react-icons/lu";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface WrapperProps {
  isAcademicsFormOpen: boolean;
  setIsAcademicsFormOpen: (value: boolean) => void;
  setShouldFetch: (value: boolean) => void;
  academics?: IAcademics;
}

interface FormProps {
  academics?: IAcademics;
  onSubmit: (values: z.infer<typeof zAcademicsCreateRequest>) => Promise<void>;
  onCancel: () => void;
}

export default function AcademicsFormWrapper({
  isAcademicsFormOpen,
  setIsAcademicsFormOpen,
  setShouldFetch,
  academics
}: WrapperProps) {
  const onSubmit = useCallback(
    async (data: z.infer<typeof zAcademicsCreateRequest>) => {
      try {
        let res;
        if (academics) {
          res = await fetch(`/api/academics/${academics._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        } else {
          res = await fetch("/api/academics", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        }
        if (!res.ok) {
          throw new Error(await res.json());
        }
        toast.success("Academics saved");
        setShouldFetch(true);
        setIsAcademicsFormOpen(false);
      } catch (err) {
        console.log((err as Error).message);
        toast.error((err as Error).message);
      }
    },
    [academics, setShouldFetch, setIsAcademicsFormOpen]
  );

  return (
    <OverlayDialog
      title={academics ? "Edit Academics" : "Create Academics"}
      open={isAcademicsFormOpen}
      onOpenChange={setIsAcademicsFormOpen}
    >
      <div>
        <AcademicsForm
          academics={academics}
          onSubmit={onSubmit}
          onCancel={() => setIsAcademicsFormOpen(false)}
        />
      </div>
    </OverlayDialog>
  );
}

function AcademicsForm({ academics, onSubmit, onCancel }: FormProps) {
  const form = useForm<z.infer<typeof zAcademicsCreateRequest>>({
    resolver: zodResolver(zAcademicsCreateRequest),
    defaultValues: {
      level: academics?.level
        ? AcademicLevel[academics.level as keyof typeof AcademicLevel]
        : undefined,
      degree: academics?.degree || "",
      institutionImage: academics?.institutionImage || "",
      institutionName: academics?.institutionName || "",
      startYear: academics?.startYear || "",
      endYear: academics?.endYear || "",
      marksObtained: academics?.marksObtained || 0,
      marksOutOf: academics?.marksOutOf || 0
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
        className="space-y-4"
      >
        {/* Level  */}
        <Controller
          control={form.control}
          name="level"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(AcademicLevel).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        {/* Degree */}
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masters of Computer Application"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Institution Name */}
        <FormField
          control={form.control}
          name="institutionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="The Park English School"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Institution Image */}
        <FormField
          control={form.control}
          name="institutionImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution Image</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://........."
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Start Year */}
        <FormField
          control={form.control}
          name="startYear"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={2002}
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* End Year */}
        <FormField
          control={form.control}
          name="endYear"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={2002}
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Marks */}
        <FormField
          control={form.control}
          name="marksObtained"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Marks Obtained</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={0}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Out of */}
        <FormField
          control={form.control}
          name="marksOutOf"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Marks Out Of</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={0}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            size="sm"
            className="bg-app-secondary text-app-primary hover:text-white hover:shadow-lg"
            onClick={onCancel}
            disabled={form.formState.isSubmitting}
          >
            Close
          </Button>
          <Button
            type="submit"
            size="sm"
            className="bg-app-secondary text-app-primary hover:text-white hover:shadow-lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {"Saving..."}
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
