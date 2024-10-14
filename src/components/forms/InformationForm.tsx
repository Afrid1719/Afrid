import { IAdminWOPassword } from "@/interfaces/i-admin";
import OverlayDialog from "../OverlayDialog";
import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zAdminUpdateRequest } from "@/schemas/z-admin";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { LuX as X, LuPlus as Plus, LuLoader2 as Loader2 } from "react-icons/lu";
import { Separator } from "../ui/separator";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { SocialLinksList } from "@/utils/social-link-list";

interface WrapperProps {
  isInformationFormOpen: boolean;
  setIsInformationFormOpen: (value: boolean) => void;
  setShouldFetch: (value: boolean) => void;
  user: IAdminWOPassword;
}

interface InformationFormProps {
  onSubmit: (values: z.infer<typeof zAdminUpdateRequest>) => Promise<void>;
  onCancel: () => void;
  user: IAdminWOPassword;
}

export default function InformationFormWrapper({
  isInformationFormOpen,
  setIsInformationFormOpen,
  setShouldFetch,
  user
}: WrapperProps) {
  const onSubmit = useCallback(
    async (values: z.infer<typeof zAdminUpdateRequest>) => {
      try {
        const res = await fetch(`/api/admins/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });
        if (!res.ok) throw new Error((res as any).message);
        toast.success("Information updated successfully");
        setShouldFetch(true);
        setIsInformationFormOpen(false);
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
      }
    },
    [user, setShouldFetch, setIsInformationFormOpen]
  );

  return (
    <OverlayDialog
      title="Edit Admin Information"
      open={isInformationFormOpen}
      onOpenChange={setIsInformationFormOpen}
    >
      <InformationForm
        onSubmit={onSubmit}
        onCancel={() => setIsInformationFormOpen(false)}
        user={user}
      />
    </OverlayDialog>
  );
}

function InformationForm({ onSubmit, onCancel, user }: InformationFormProps) {
  const form = useForm<z.infer<typeof zAdminUpdateRequest>>({
    resolver: zodResolver(zAdminUpdateRequest),
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      title: user?.title || "",
      introduction: user?.introduction || "",
      socialLinks: user?.socialLinks || [],
      location: user?.location || "",
      phone: user?.phone || ""
    }
  });

  const {
    fields: socialLinks,
    append: appendSocialLink,
    remove: removeSocialLink
  } = useFieldArray({
    control: form.control,
    name: "socialLinks"
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
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Syed Afrid Ali" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Full Stack Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Introduction */}
        <FormField
          control={form.control}
          name="introduction"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction</FormLabel>
              <FormControl>
                <Textarea placeholder="Introduction goes here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 xxxxx xxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Kolkata, India" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Social Links */}
        <div className="flex flex-col items-start">
          <Label>Social Links</Label>
          {socialLinks.map((item, index) => (
            <div className="w-full space-y-2" key={`socialLinks.${index}`}>
              <FormField
                key={`socialLinks.${index}.name`}
                control={form.control}
                name={`socialLinks.${index}.name` as const}
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center mt-2">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a social link" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Object.keys(SocialLinksList).map((key) => (
                                <SelectItem key={key} value={key}>
                                  {key}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSocialLink(index)}
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

              <FormField
                key={`socialLinks.${index}.link`}
                control={form.control}
                name={`socialLinks.${index}.link` as const}
                disabled={form.formState.isSubmitting}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Icon Url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-3/4 mx-auto flex justify-between">
                <X className="h-4 w-4" />
                <Separator className="bg-app-tertiary" />
                <X className="h-4 w-4" />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendSocialLink({})}
            disabled={form.formState.isSubmitting}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </div>
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
