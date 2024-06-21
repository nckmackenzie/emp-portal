'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { useStore } from '@/hooks/use-store';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';

export default function Logo() {
  const { theme } = useTheme();
  const sidebar = useStore(useSidebarToggle, state => state);

  if (!sidebar) return null;

  return sidebar.isOpen ? (
    <Image
      src={theme === 'light' ? '/logos/logo-black.png' : '/logos/logo-dark.svg'}
      alt="panesar logo"
      className="h-10 w-auto"
      width={1200}
      height={960}
    />
  ) : (
    <Image
      src={
        theme === 'light'
          ? '/logos/favicon-black.svg'
          : '/logos/favicon-white.svg'
      }
      alt="panesar logo"
      width={36}
      height={36}
      className="size-8"
    />
  );
}
