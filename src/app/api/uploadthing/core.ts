import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";

const f = createUploadthing();


export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await getServerSession();

      if (!user) throw new UploadThingError("Unauthorized");

      return {
        userId: user?.user
      }

    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        name: file.name,
        url: file.url,
        key: file.key,
        uploadId: metadata.userId
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
