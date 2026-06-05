import { Badge } from '@/components/ui/badge';

import { labels } from '../data/data';
import { DataTableColumnHeader } from './DataTableColumnHeader';

export const columns = [
  {
    accessorKey: '_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('_id')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="">
        {row.getValue('user')?.firstName} {row.getValue('user')?.lastName}
      </div>
    ),
  },
  {
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('user')?.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'expiringOn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      const isActive = new Date(row.getValue('expiringOn')) > new Date();
      return (
        <div
          className={`flex space-x-2 ${
            isActive ? 'text-green-600' : 'text-slate-600'
          }`}
        >
          <span className="max-w-[500px] truncate font-medium">
            {isActive ? 'Yes' : 'No'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {new Date(row.getValue('createdAt')).toLocaleString()}
          </span>
        </div>
      );
    },
  },
];
