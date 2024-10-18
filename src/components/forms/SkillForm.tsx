import OverlayDialog from "@/components/OverlayDialog";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
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
import { LuLoader2 as Loader2 } from "react-icons/lu";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { ISkill } from "@/interfaces/i-home";
import { zSkillCreateRequest } from "@/schemas/z-skill";
import { Slider } from "@/components/ui/slider";

interface WrapperProps {
  isSkillFormOpen: boolean;
  setIsSkillFormOpen: (value: boolean) => void;
  setShouldFetch: (value: boolean) => void;
  skill?: ISkill;
}

interface FormProps {
  skill?: ISkill;
  onSubmit: (values: z.infer<typeof zSkillCreateRequest>) => Promise<void>;
  onCancel: () => void;
}

export default function SkillFormWrapper({
  isSkillFormOpen,
  setIsSkillFormOpen,
  setShouldFetch,
  skill
}: WrapperProps) {
  const onSubmit = useCallback(
    async (data: z.infer<typeof zSkillCreateRequest>) => {
      try {
        let res;
        if (skill) {
          res = await fetch(`/api/skills/${skill._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        } else {
          res = await fetch("/api/skills", {
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
        toast.success("Skill saved");
        setShouldFetch(true);
        setIsSkillFormOpen(false);
      } catch (err) {
        console.log((err as Error).message);
        toast.error((err as Error).message);
      }
    },
    [skill, setShouldFetch, setIsSkillFormOpen]
  );

  return (
    <OverlayDialog
      title={skill ? "Edit Skill" : "Create Skill"}
      open={isSkillFormOpen}
      onOpenChange={setIsSkillFormOpen}
    >
      <div>
        <SkillForm
          skill={skill}
          onSubmit={onSubmit}
          onCancel={() => setIsSkillFormOpen(false)}
        />
      </div>
    </OverlayDialog>
  );
}

function SkillForm({ skill, onSubmit, onCancel }: FormProps) {
  const form = useForm<z.infer<typeof zSkillCreateRequest>>({
    resolver: zodResolver(zSkillCreateRequest),
    defaultValues: {
      name: skill?.name || "",
      icon: skill?.icon || "",
      rating: skill?.rating || 0
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))}
        className="space-y-4"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="Enter the name of the skill"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Icon */}
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  disabled={form.formState.isSubmitting}
                  placeholder="Enter the url for the skill or brand icon"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Rating */}
        <Controller
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="relative">
                  <Slider
                    disabled={form.formState.isSubmitting}
                    value={[field.value]}
                    onValueChange={(val) => field.onChange(val[0])}
                    min={0}
                    max={10}
                    step={0.1}
                  />
                  {/* Bubble to show current value */}
                  <div
                    className="absolute top-[15px] transform -translate-x-1/2"
                    style={{
                      left: `calc(${
                        field.value < 0.5
                          ? field.value * 10 + 4
                          : field.value > 9.5
                          ? field.value * 10 - 4
                          : field.value * 10
                      }%)`
                    }}
                  >
                    <span className="bg-gray-700 text-white text-xs rounded px-2 py-1">
                      {field.value}
                    </span>
                  </div>
                </div>
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
