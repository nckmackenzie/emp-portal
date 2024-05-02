'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, titleCase } from '@/lib/utils';
import { Option } from '@/index';

interface CustomSelectProps {
  placeholder: string;
  options: Option[];
  className?: string;
  defaultValue?: string;
  isFilter?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function CustomSelect({
  className,
  placeholder,
  defaultValue,
  options,
  isFilter,
  onChange,
  disabled,
  value,
}: CustomSelectProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleFilter(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('vendor', value);
    } else {
      params.delete('vendor');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={(value: string) => {
        if (isFilter) {
          handleFilter(value);
        } else {
          onChange && onChange(value);
        }
      }}
    >
      <SelectTrigger className={cn('w-[280px]', className)} disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {titleCase(option.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
