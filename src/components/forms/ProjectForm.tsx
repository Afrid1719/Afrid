import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IProject } from "@/interfaces/i-home";
import { zProjectCreateRequest } from "@/schemas/z-project";
import { z } from "zod";
import { TagInput } from "@/components/ui/taginput";
import { startTransition, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import OverlayDialog from "@/components/OverlayDialog";
import {
  LuLoader2 as Loader2,
  LuCalendar as CalendarIcon
} from "react-icons/lu";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface ProjectFormProps {
  onSubmit: (values: z.infer<typeof zProjectCreateRequest>) => Promise<void>;
  onCancel: () => void;
  project?: IProject;
}

interface WrapperProps {
  isProjectFormOpen: boolean;
  setIsProjectFormOpen: (value: boolean) => void;
  setShouldFetch: (value: boolean) => void;
  project?: IProject;
}

export default function ProjectFormWrapper({
  isProjectFormOpen,
  setIsProjectFormOpen,
  setShouldFetch,
  project
}: WrapperProps) {
  const onSubmit = useCallback(
    async (data: z.infer<typeof zProjectCreateRequest>) => {
      try {
        let res;
        if (project) {
          res = await fetch(`/api/projects/${project._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        } else {
          res = await fetch("/api/projects", {
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
        toast.success("Project saved");
        setShouldFetch(true);
        setIsProjectFormOpen(false);
      } catch (err) {
        console.log((err as Error).message);
        toast.error((err as Error).message);
      }
    },
    [project, setShouldFetch, setIsProjectFormOpen]
  );
  return (
    <OverlayDialog
      title={project ? "Edit Project" : "Create Project"}
      open={isProjectFormOpen}
      onOpenChange={setIsProjectFormOpen}
    >
      <div>
        <ProjectForm
          project={project}
          onSubmit={onSubmit}
          onCancel={() => setIsProjectFormOpen(false)}
        />
      </div>
    </OverlayDialog>
  );
}

function ProjectForm({ onSubmit, onCancel, project }: ProjectFormProps) {
  const form = useForm<z.infer<typeof zProjectCreateRequest>>({
    resolver: zodResolver(zProjectCreateRequest),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      codeLink: project?.codeLink || "",
      url: project?.url || "",
      techs: project?.techs || [],
      createdOn: project?.createdOn
        ? moment(project.createdOn).toDate()
        : undefined
    }
  });

  const [tags, setTags] = useState<string[]>([]);
  const { setValue, control, handleSubmit } = form;
  const techValues = form.getValues("techs");

  // Sync tags with form state
  useEffect(() => {
    setTags(techValues || []);
  }, [techValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
        className="space-y-4"
      >
        {/* Name */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the name of the project"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the description of the project"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="createdOn"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Created On</FormLabel>
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

        {/* Code Link */}
        <FormField
          control={control}
          name="codeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Enter the repo link"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Live URL */}
        <FormField
          control={control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Enter the live URL of the project"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Techs */}
        <FormField
          control={control}
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
