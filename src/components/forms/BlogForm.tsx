"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import { zBlogCreateRequest } from "@/schemas/z-blog";
import { startTransition, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { TagInput } from "@/components/ui/taginput";
import { LuLoader2 as Loader2 } from "react-icons/lu";
import Uploader from "@/components/Uploader";
import { IBlog } from "@/interfaces/i-home";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table";
// import Image from "next/image";
// import {
//   LuCopy as Copy,
//   LuCopyCheck as CopyCheck,
//   LuTrash as Trash
// } from "react-icons/lu";
// import { deleteResource } from "@/utils/cloudinary";

interface FormProps {
  form: ReturnType<typeof useForm>;
  onSubmit: (values: z.infer<typeof zBlogCreateRequest>) => void;
  setOpenImageUploader: (value: boolean) => void;
}

export default function Wrapper({ data }: { data?: IBlog }) {
  const [openImageUploader, setOpenImageUploader] = useState(false);

  const o_setOpenImageUploader = useCallback((value: boolean) => {
    setOpenImageUploader(value);
  }, []);

  const form = useForm<z.infer<typeof zBlogCreateRequest>>({
    resolver: zodResolver(zBlogCreateRequest),
    defaultValues: {
      title: data?.title || "",
      content: data?.content || "",
      excerpt: data?.excerpt || "",
      readTime: +data?.readTime || 0,
      image: data?.image || "",
      tags: data?.tags.length > 0 ? data.tags : []
    },
    mode: "onSubmit"
  });

  const onUploadComplete = useCallback(
    async (result: PromiseFulfilledResult<Response>[]) => {
      const response = await result[0].value.json();
      form.setValue("image", response.secure_url);
    },
    [form]
  );

  const onSubmit = useCallback(
    async (values: z.infer<typeof zBlogCreateRequest>) => {
      try {
        let res;
        if (data) {
          res = await fetch(`/api/blogs/${data._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
          });
          if (!res.ok) {
            throw new Error(await res.json());
          }
          const updatedData = await res.json();
          toast.success("Blog updated successfully.");
        } else {
          res = await fetch("/api/blogs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
          });
          if (!res.ok) {
            throw new Error(await res.json());
          }
          const createdData = await res.json();
          toast.success("Blog created successfully.");
        }
      } catch (err) {
        console.log((err as Error).message);
        toast.error((err as Error).message);
      }
    },
    [data]
  );

  return (
    <>
      <BlogForm
        form={form}
        onSubmit={onSubmit}
        setOpenImageUploader={o_setOpenImageUploader}
      />
      <Uploader
        isUploaderOpen={openImageUploader}
        setIsUploaderOpen={o_setOpenImageUploader}
        acceptFileType="image/*"
        onUploadComplete={onUploadComplete}
      />
    </>
  );
}

function BlogForm({ form, onSubmit, setOpenImageUploader }: FormProps) {
  const [previewTab, setPreviewTab] = useState("write");
  const [tags, setTags] = useState<string[]>([]);
  const {
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = form;
  const tagsValues = form.getValues("tags");

  // Sync tags with form state
  useEffect(() => {
    setTags(tagsValues || []);
  }, [tagsValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the blog post title"
                  disabled={isSubmitting}
                  {...field}
                  className="bg-app-primary/70 border border-app-primary text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the excerpt of your blog post"
                  disabled={isSubmitting}
                  {...field}
                  className="bg-app-primary/70 border border-app-primary text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="readTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Read Time</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the estimated read time of your blog post"
                  disabled={isSubmitting}
                  {...field}
                  className="bg-app-primary/70 border border-app-primary text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="w-auto h-auto flex justify-between bg-transparent mx-auto p-1 border border-app-primary">
                  <TabsTrigger
                    value="write"
                    onClick={() => setPreviewTab("write")}
                    className="grow text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
                  >
                    Write
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    onClick={() => setPreviewTab("preview")}
                    className="grow text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="write">
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post content here using Markdown"
                      disabled={isSubmitting}
                      {...field}
                      className="bg-app-primary/70 border border-app-primary min-h-[300px] max-h-[700px]"
                    />
                  </FormControl>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="bg-white border border-app-primary text-black rounded-md p-4 min-h-[300px] max-h-[700px] overflow-auto prose max-w-none">
                    <ReactMarkdown className="prose">
                      {field.value}
                    </ReactMarkdown>
                  </div>
                </TabsContent>
              </Tabs>
              <FormDescription>
                You can use Markdown for formatting. Switch to the Preview tab
                to see how it looks.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter the image URL of your blog post"
                    disabled={true}
                    {...field}
                    className="disabled:bg-app-primary/70 border border-app-primary text-white disabled:cursor-default w-full pr-[82px] text-ellipsis"
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2 hover:bg-transparent text-white hover:text-white"
                    onClick={() => setOpenImageUploader(true)}
                  >
                    Choose
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  {...field}
                  placeholder="Add tags to your blog post"
                  tags={tags}
                  className="sm:min-w-[450px] bg-app-primary/70 border border-app-primary text-white"
                  disabled={isSubmitting}
                  setTags={(newTags) => {
                    setTags(newTags);
                    startTransition(() => {
                      setValue(
                        "tags",
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

        {/* TODO: Add post images for self hosted images */}
        {/* <PostImages isFormSubmiting={isSubmitting} /> */}

        <Button
          type="submit"
          className="w-full font-bold bg-app-tertiary text-[#111] hover:text-white hover:shadow-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
              {"Submitting..."}
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}

// Not in use for now
// function PostImages({ isFormSubmiting }: { isFormSubmiting: boolean }) {
//   const [copiedImage, setCopiedImage] = useState<string>(undefined);
//   const [uploadImages, setUploadImages] = useState<
//     { url: string; publicId: string }[]
//   >([]);
//   const [openImageUploader, setOpenImageUploader] = useState<boolean>(false);

//   const o_setOpenImageUploader = useCallback((value: boolean) => {
//     setOpenImageUploader(value);
//   }, []);

//   const onUploadComplete = useCallback(
//     async (result: PromiseFulfilledResult<Response>[]) => {
//       result.forEach(async (res) => {
//         const image = await res.value.json();
//         setUploadImages((prev) => [
//           ...prev,
//           { url: image.secure_url, publicId: image.public_id }
//         ]);
//       });
//     },
//     []
//   );

//   const onDeleteImage = useCallback(
//     async (evt: React.MouseEvent, id: string) => {
//       evt.preventDefault();
//       try {
//         const response = await fetch("/api/cloudinary-signature", {
//           method: "POST",
//           body: JSON.stringify({ id })
//         });
//         const { signature, timestamp } = await response.json();
//         await deleteResource(id, signature, timestamp);
//         setUploadImages((prev) =>
//           prev.filter((image) => image.publicId !== id)
//         );
//       } catch (error) {
//         console.log(error);
//         toast.error("Failed to delete image");
//       }
//     },
//     []
//   );

//   return (
//     <div className="flex flex-col items-start w-full space-y-2">
//       <h4 className="text-base">Post Images</h4>
//       <em className="text-sm text-neutral-500">
//         Upload images here and copy paste its URL in the post content
//       </em>
//       <Button
//         type="button"
//         onClick={() => setOpenImageUploader(true)}
//         className="w-auto font-bold bg-app-color-4 text-[#111] hover:text-white hover:shadow-lg self-end"
//         disabled={isFormSubmiting}
//       >
//         Add Images
//       </Button>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-white dark:text-white">
//               Preview
//             </TableHead>
//             <TableHead className="text-white dark:text-white max-w-[300px]">
//               {" "}
//               URL
//             </TableHead>
//             <TableHead className="text-white dark:text-white">
//               Actions
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {uploadImages.map((image, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <Image
//                   src={image.url}
//                   width={200}
//                   height={100}
//                   alt={image.publicId}
//                   className="w-36 h-12 md:w-48 md:h-24 object-contain"
//                 />
//               </TableCell>
//               <TableCell className="text-app-color-4 max-w-[300px] text-ellipsis overflow-hidden">
//                 {image.url}
//               </TableCell>

//               <TableCell>
//                 <div className="flex items-center space-x-2">
//                   <Button
//                     variant="ghost"
//                     type="button"
//                     className={`text-app-color-4 hover:text-white hover:bg-gray-900 ${
//                       copiedImage == image.url ? "bg-gray-900" : ""
//                     }`}
//                     onClick={() => {
//                       setCopiedImage(image.url);
//                       navigator.clipboard.writeText(image.url);
//                       toast.success("Copied to clipboard");
//                     }}
//                     disabled={copiedImage == image.url}
//                   >
//                     {copiedImage == image.url ? (
//                       <CopyCheck size={18} />
//                     ) : (
//                       <Copy size={18} />
//                     )}
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     type="button"
//                     className="text-red-500 hover:text-red-600 hover:bg-gray-900"
//                     onClick={(evt) => onDeleteImage(evt, image.publicId)}
//                   >
//                     <Trash size={14} />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Uploader
//         isUploaderOpen={openImageUploader}
//         setIsUploaderOpen={o_setOpenImageUploader}
//         acceptFileType="image/*"
//         onUploadComplete={onUploadComplete}
//         filesLimit={5}
//       />
//     </div>
//   );
// }
