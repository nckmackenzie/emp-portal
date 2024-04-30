import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface DashboardCardProps {
  label: string;
  value: string | number;
  href?: string;
  Icon: LucideIcon;
}

function DashboardCard({ label, value, href, Icon }: DashboardCardProps) {
  return (
    <Card className="rounded-xl bg-neutral border-none flex justify-center">
      <CardContent className="p-4 flex flex-col space-y-3">
        <div className="text-muted-foreground text-sm flex items-center gap-2">
          <Icon className="icon" />
          <h5 className="font-semibold">{label}</h5>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-center">{value}</div>
          {href && (
            <Link
              href={href}
              className="text-xs font-semibold text-blue-500 block text-center"
            >
              View Details &rarr;
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
