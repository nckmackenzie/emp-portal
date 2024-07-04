import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { dummyArray } from '@/lib/utils';

export function DashboardCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dummyArray(4).map((_, i) => (
        <Card className="rounded-xl border-none flex justify-center" key={i}>
          <CardContent className="p-4 flex flex-col space-y-3">
            <div className="text-muted-foreground text-sm flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="w-44 h-4" />
            </div>
            <div className="space-y-1 self-center flex flex-col">
              <Skeleton className="w-8 h-6 self-center" />
              <Skeleton className="w-16 h-3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
