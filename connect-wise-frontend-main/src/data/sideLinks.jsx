import {
  IconChecklist,
  IconLayoutDashboard,
  IconMessages,
  IconSettings,
} from '@tabler/icons-react';

export default [
  {
    title: 'Search',
    label: '',
    href: '/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Transactions',
    label: '',
    href: '/dashboard/transactions',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Chats',
    label: '',
    href: '/dashboard/chats',
    icon: <IconMessages size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/dashboard/settings',
    icon: <IconSettings size={18} />,
  },
];
