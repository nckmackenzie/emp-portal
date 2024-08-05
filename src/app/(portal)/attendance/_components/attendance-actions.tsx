'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { type DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

import DateRangePicker from '@/components/ui/date-ranger-picker';

export default function AttendanceActions() {
  const searchParams = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from')!)
      : new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to')!)
      : addDays(new Date(), 20),
  });
  return <DateRangePicker onSetDate={setDate} date={date} setQueryParams />;
}
