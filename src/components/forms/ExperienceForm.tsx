import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { zExperienceCreateRequest } from "@/schemas/z-experience";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import moment from "moment";
import {
  LuX as X,
  LuPlus as Plus,
  LuLoader2 as Loader2,
  LuCalendar as CalendarIcon
} from "react-icons/lu";
import { Calendar } from "@/components/ui/calendar";
import { startTransition, useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/ui/taginput";
import { Textarea } from "@/components/ui/textarea";
import { IExperience } from "@/interfaces/i-professional";
import OverlayDialog from "@/components/OverlayDialog";
import toast from "react-hot-toast";

interface ExperienceFormProps {
  onSubmit: (values: z.infer<typeof zExperienceCreateRequest>) => Promise<void>;
  onCancel: () => void;
  experience?: IExperience;
}

interface WrapperProps extends Omit<ExperienceFormProps, "onSubmit"> {
  isExperienceFormOpen: boolean;
  setIsExperienceFormOpen: (value: boolean) => void;
  setShouldFetch: (value: boolean) => void;
}

export default function ExperienceFormWrapper({
  isExperienceFormOpen,
  setIsExperienceFormOpen,
  setShouldFetch,
  onCancel,
  experience
}: WrapperProps) {
  const onSubmit = useCallback(
    async (data: z.infer<typeof zExperienceCreateRequest>) => {
      try {
        let res;
        if (experience) {
          res = await fetch(`/api/experiences/${experience._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        } else {
          res = await fetch("/api/experiences", {
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
        toast.success("Experience saved");
        setShouldFetch(true);
        setIsExperienceFormOpen(false);
      } catch (err) {
        console.log((err as Error).message);
        toast((err as Error).message);
      }
    },
    [experience, setShouldFetch, setIsExperienceFormOpen]
  );

  return (
    <OverlayDialog
      title={experience ? "Edit Experience" : "Add Experience"}
      open={isExperienceFormOpen}
      onOpenChange={setIsExperienceFormOpen}
    >
      <ExperienceForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        experience={experience}
      />
    </OverlayDialog>
  );
}

function ExperienceForm({
  onSubmit,
  onCancel,
  experience
}: ExperienceFormProps) {
  const form = useForm<z.infer<typeof zExperienceCreateRequest>>({
    resolver: zodResolver(zExperienceCreateRequest),
    defaultValues: {
      position: experience?.position || "",
      company: experience?.company || "",
      startDate: experience?.startDate
        ? moment(experience?.startDate).toDate()
        : undefined,
      endDate: experience?.endDate
        ? moment(experience.endDate).toDate()
        : undefined,
      description: experience?.description || [""],
      techs: experience?.techs || [""]
    }
  });

  const {
    fields: descFields,
    append: appendDesc,
    remove: removeDesc
  } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "description"
  });

  const [tags, setTags] = useState<string[]>([]);
  const { setValue } = form;
  const techValues = form.getValues("techs");

  // Sync tags with form state
  useEffect(() => {
    setTags(techValues || []);
  }, [techValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
        className="space-y-4"
      >
        {/* Position  */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  placeholder="Software Engineer"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Company */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  placeholder="ABC Company Ltd."
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={form.formState.isSubmitting}
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        moment(field.value).calendar(null, {
                          sameDay: "[Today]",
                          nextDay: "[Tomorrow]",
                          nextWeek: "dddd",
                          lastDay: "[Yesterday]",
                          lastWeek: "[Last] dddd",
                          sameElse: "DD-MM-YYYY"
                        })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={{ after: new Date() }}
                    defaultMonth={
                      field.value ? new Date(field.value) : new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* End Date */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={form.formState.isSubmitting}
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        moment(field.value).calendar(null, {
                          sameDay: "[Today]",
                          nextDay: "[Tomorrow]",
                          nextWeek: "dddd",
                          lastDay: "[Yesterday]",
                          lastWeek: "[Last] dddd",
                          sameElse: "DD-MM-YYYY"
                        })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={
                      field.value ? new Date(field.value) : new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description */}
        <div className="flex flex-col items-start">
          <Label>Description</Label>
          {descFields.map((item, index) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`description.${index}`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex items-center mt-2">
                      <Textarea
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder={`Description ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDesc(index)}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendDesc("")}
            disabled={form.formState.isSubmitting}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Description
          </Button>
        </div>

        {/* Techs */}
        <FormField
          control={form.control}
          name="techs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technology</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder="Enter a technology"
                  tags={tags}
                  className="sm:min-w-[450px]"
                  disabled={form.formState.isSubmitting}
                  setTags={(newTags) => {
                    setTags(newTags);
                    startTransition(() => {
                      setValue(
                        "techs",
                        newTags.length
                          ? (newTags as [string, ...string[]])
                          : [],
                        { shouldValidate: true }
                      );
                    });
                  }}
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
