import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { validateRequest } from '../../../../auth';

const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageOrDocumentUploader: f(['image', 'pdf'])
    // .middleware(async ({ req }) => {
    //   // const { user } = await validateRequest();
    //   // console.log(user);

    //   // if (!user) throw new UploadThingError('Unauthorized');

    //   // Whatever is returned here is accessible in onUploadComplete as `metadata`
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return 'Upload success!';
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
