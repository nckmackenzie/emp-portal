import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function loading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-52 h-8" />
        <Skeleton className="w-72 h-4" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
          <Skeleton className="col-span-full md:col-span-4 h-10" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row gap-2">
        <Skeleton className="w-full md:w-36 h-10" />
        <Skeleton className="w-full md:w-36 h-10" />
      </CardFooter>
    </Card>
  );
}
