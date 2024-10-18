import { ITool } from "@/interfaces/i-home";
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
import { zToolCreateRequest } from "@/schemas/z-tool";
import { Slider } from "@/components/ui/slider";

interface ToolFormProps {
  tool?: ITool;
  onSubmit: (values: z.infer<typeof zToolCreateRequest>) => Promise<void>;
  onCancel: () => void;
}

interface ToolFormWrapperProps {
  isToolFormOpen: boolean;
  setIsToolFormOpen: (value: boolean) => void;
  setShouldFetch: (value: boolean) => void;
  tool?: ITool;
}

const ToolForm: React.FC<ToolFormProps> = ({ tool, onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof zToolCreateRequest>>({
    resolver: zodResolver(zToolCreateRequest),
    defaultValues: {
      name: tool?.name || "",
      icon: tool?.icon || "",
      rating: tool?.rating || 0
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
                  placeholder="Enter the name of the tool"
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
                  placeholder="Enter the URL of the tool image/icon"
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
                    value={[field.value]}
                    disabled={form.formState.isSubmitting}
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
        {/* Buttons */}
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
};

const ToolFormWrapper: React.FC<ToolFormWrapperProps> = ({
  isToolFormOpen,
  setIsToolFormOpen,
  setShouldFetch,
  tool
}) => {
  const onSubmit = useCallback(
    async (data: z.infer<typeof zToolCreateRequest>) => {
      try {
        let res;
        if (tool) {
          res = await fetch(`/api/tools/${tool._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        } else {
          res = await fetch("/api/tools", {
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
        toast.success("Tool saved");
        setShouldFetch(true);
        setIsToolFormOpen(false);
      } catch (err) {
        console.log((err as Error).message);
        toast.error((err as Error).message);
      }
    },
    [tool, setShouldFetch, setIsToolFormOpen]
  );

  return (
    <OverlayDialog
      title={tool ? "Edit Tool" : "Create Tool"}
      open={isToolFormOpen}
      onOpenChange={setIsToolFormOpen}
    >
      <div>
        <ToolForm
          tool={tool}
          onSubmit={onSubmit}
          onCancel={() => setIsToolFormOpen(false)}
        />
      </div>
    </OverlayDialog>
  );
};

export default ToolFormWrapper;
