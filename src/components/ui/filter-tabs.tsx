'use client';
import { useSearchParams } from 'next/navigation';

import { Button } from './button';

import { cn } from '@/lib/utils';
import { Option } from '@/index';
import { useSetParams } from '@/hooks/use-set-params';

type Props = {
  className?: string;
  options: Option[];
  filterKey: string;
  defaultTab?: string;
  size?: 'sm' | 'md' | 'lg';
};

function FilterTabs({
  filterKey,
  options,
  className,
  defaultTab,
  size,
}: Props) {
  const searchParams = useSearchParams();
  const setParams = useSetParams();
  const selectedTab =
    searchParams.get(filterKey) || defaultTab || options.at(0)?.value;

  function handleClick(value: string) {
    setParams({ [filterKey]: value });
  }

  return (
    <div
      className={cn(
        'p-1 bg-secondary rounded flex gap-1 items-center',
        className
      )}
    >
      {options.map(option => (
        <Button
          size="xs"
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={cn(
            'py-2 bg-transparent text-secondary-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-gray-900',
            {
              'bg-primary/10 text-primary hover:bg-primary/20':
                selectedTab === option.value,
              'text-xs font-semibold': size === 'sm',
            }
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default FilterTabs;
