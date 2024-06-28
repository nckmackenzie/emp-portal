import {
  Activity,
  CalendarDays,
  User,
  LayoutGrid,
  HandCoins,
  Clock,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: '/leaves',
          label: 'Leave',
          active: pathname.includes('/leaves'),
          icon: CalendarDays,
          submenus: [],
        },
        {
          href: '/attendance',
          label: 'Attendance',
          active: pathname.includes('/attendance'),
          icon: Clock,
          submenus: [],
        },
        {
          href: '/appraisals',
          label: 'Appraisals',
          active: pathname.includes('/appraisals'),
          icon: Activity,
          submenus: [],
        },
        {
          href: '/staff-loans',
          label: 'Staff Loans',
          active: pathname.includes('/loans'),
          icon: HandCoins,
          submenus: [],
        },
        {
          href: '/my-details',
          label: 'My Details',
          active: pathname.includes('/my-details'),
          icon: User,
          submenus: [],
        },
      ],
    },
  ];
}
