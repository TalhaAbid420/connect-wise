import {
  IconChecklist,
  IconLayoutDashboard,
  IconMessages,
  IconSettings,
} from '@tabler/icons-react';

export default [
  {
    title: 'Dashboard',
    label: '',
    href: '/mentor/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Received Orders',
    label: '',
    href: '/mentor/dashboard/orders',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Chats',
    label: '',
    href: '/mentor/dashboard/chats',
    icon: <IconMessages size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/mentor/dashboard/settings',
    icon: <IconSettings size={18} />,
  },
];
