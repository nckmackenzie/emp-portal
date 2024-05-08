import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { validateRequest } from '../../../../auth';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const { user } = await validateRequest();
      if (!user) throw new Error('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
  imageOrDocumentUploader: f(['image', 'pdf'])
    .middleware(async ({ req }) => {
      const { user } = await validateRequest();
      console.log(user);

      if (!user) throw new UploadThingError('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return 'Upload success!';
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
