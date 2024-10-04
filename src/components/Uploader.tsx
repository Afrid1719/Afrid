"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface IFileWithPreview extends File {
  preview?: string;
}

interface IUploadFormProps {
  filesLimit?: number;
  acceptFileType: string;
  setIsUploadSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUploaderProps extends IUploadFormProps {
  title?: string;
  isUploaderOpen: boolean;
  setIsUploaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Uploader({
  isUploaderOpen,
  setIsUploadSuccess,
  setIsUploaderOpen,
  acceptFileType,
  title = "",
  filesLimit = 1
}: IUploaderProps) {
  useEffect(() => {
    if (isUploaderOpen) {
      document.body.style.width = "100vw";
    } else {
      document.body.style.width = "100%";
    }
  }, [isUploaderOpen]);

  return (
    <Dialog open={isUploaderOpen} onOpenChange={setIsUploaderOpen}>
      <DialogContent className="bg-app-primary/50 backdrop-blur-lg text-app-secondary mt-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UploadForm
          filesLimit={filesLimit}
          acceptFileType={acceptFileType}
          setIsUploadSuccess={setIsUploadSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}

function UploadForm({
  filesLimit,
  acceptFileType,
  setIsUploadSuccess
}: IUploadFormProps) {
  const [files, setFiles] = useState<IFileWithPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleUpload = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    startTransition(async () => {
      if (files.length > filesLimit) {
        setError("You can only upload up to " + filesLimit + " files");
        return;
      }
      try {
        const response = await fetch("/api/assets", {
          method: "POST",
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          toast.success("File(s) uploaded successfully");
          setIsUploadSuccess(true);
        }
      } catch (error: unknown) {
        console.error(error);
        setError((error as Error).message);
        setIsUploadSuccess(false);
      }
    });
  };

  const onDropMultiple = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => {
        if (filesLimit === 1) {
          return acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          );
        }
        return [
          ...prev,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        ];
      });
    },
    [filesLimit]
  );

  const removeFile = (file: IFileWithPreview) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onDropMultiple(Array.from(event.dataTransfer.files));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form encType="multipart/form-data" onSubmit={handleUpload}>
        {error && <div className="text-red-500 text-sm p-2">{error}</div>}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple={filesLimit > 1 ? true : false}
            onChange={(e) => onDropMultiple(Array.from(e.target.files || []))}
            accept={acceptFileType}
            className="hidden"
            id="fileInput"
            name="files"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop files here, or click to select files
            </p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.name}
                className="relative ring-1 ring-sky-400 rounded-md p-2"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={50}
                  height={50}
                  className="h-16 w-full object-contain rounded-md"
                />
                <button
                  onClick={() => removeFile(file)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="mt-2 text-xs text-gray-500 truncate">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-row justify-end mt-4">
          {files.length > 0 && (
            <Button
              className="bg-app-secondary text-app-primary hover:text-white hover:shadow-lg"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Uploading..." : "Upload"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
