import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { NAV_LINKS } from '../../_components/header';
import Link from 'next/link';
import clsx from 'clsx';

export default function MenuButton({ pathName }: { pathName: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="md:hidden flex items-center justify-center"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="space-y-8">
        <div className="mt-6 flex justify-center">
          <Image
            src="/logos/logo-black.png"
            alt="Panesar Logo"
            className="h-10 w-auto"
            width={1200}
            height={960}
          />
        </div>
        <nav className="flex flex-col items-center gap-4 text-muted-foreground">
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
        {/* </SheetHeader> */}
      </SheetContent>
    </Sheet>
  );
}
