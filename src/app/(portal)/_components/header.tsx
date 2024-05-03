/* eslint-disable @next/next/no-img-element */
'use client';

import clsx from 'clsx';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { logout } from '@/app/(auth)/_actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MenuButton from '../dashboard/_components/menu-button';

export const NAV_LINKS = [
  {
    href: '/dashboard',
    name: 'Dashboard',
  },

  {
    href: '/leave-application',
    name: 'Leave Application',
  },
  {
    href: '/appraisals',
    name: 'Appraisals',
  },
  {
    href: '/my-details',
    name: 'My Details',
  },
];

export default function Header() {
  const pathName = usePathname();

  return (
    <header className="bg-neutral/30 md:shadow-md h-16 flex items-center">
      <div className="container">
        <div className="flex items-center gap-6">
          <MenuButton pathName={pathName} />
          <img
            src="/logos/favicon-black.svg"
            alt="Panesar Logo"
            className="hidden md:block h-8"
          />
          <nav className="hidden md:flex items-center gap-8 text-muted-foreground">
            {NAV_LINKS.map(link => (
              <Link
                className={clsx('transition-colors hover:text-primary', {
                  'text-primary font-semibold': pathName === link.href,
                })}
                key={link.href}
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Bell className="text-muted-foreground size-5" />
              <span className=" bg-rose-400 text-xs text-white rounded-full size-4 flex items-center justify-center absolute right-0 -top-2">
                2
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
