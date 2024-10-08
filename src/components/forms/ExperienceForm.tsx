import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../ui/input";
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
} from "../ui/form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import moment from "moment";
import { CalendarIcon, Plus, X } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Label } from "../ui/label";
import { TagInput } from "../ui/taginput";

export default function ExperienceFormWrapper() {
  const form = useForm<z.infer<typeof zExperienceCreateRequest>>({
    resolver: zodResolver(zExperienceCreateRequest),
    defaultValues: {
      position: "",
      company: "",
      description: [""],
      techs: [""]
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

  const onSubmit = (
    evt: Event,
    values: z.infer<typeof zExperienceCreateRequest>
  ) => {};
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => console.log(data),
          (error) => console.log(error)
        )}
        className="space-y-4 lg:space-y-8 m-2"
      >
        {/* Position  */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
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
                <Input placeholder="ABC Company Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
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
                      <Input
                        {...field}
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
              <FormLabel>Topics</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder="Enter a topic"
                  tags={tags}
                  className="sm:min-w-[450px]"
                  setTags={(newTags) => {
                    setTags(newTags);
                    setValue("techs", newTags as [string, ...string[]]);
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
          >
            Close
          </Button>
          <Button
            type="submit"
            size="sm"
            className="bg-app-secondary text-app-primary hover:text-white hover:shadow-lg"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
