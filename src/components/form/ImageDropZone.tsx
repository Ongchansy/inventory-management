import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming you have a utility for conditional classes

interface ImageDropzoneProps {
  onDrop: (file: File | null) => void;
}

export function ImageDropzone({ onDrop }: ImageDropzoneProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setImagePreview(URL.createObjectURL(file));
      onDrop(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    onDrop(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg transition",
          "text-gray-500 hover:border-blue-500 hover:bg-gray-50",
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600">Drop the files here ...</p>
        ) : (
          <p>Drag and drop an image here, or click to select one</p>
        )}
      </div>

      {imagePreview && (
        <div className="mt-4 flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Image preview"
            className="h-24 w-24 object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            onClick={handleRemoveImage}
            className="mt-2 text-xs"
          >
            Remove Image
          </Button>
        </div>
      )}
    </div>
  );
}
