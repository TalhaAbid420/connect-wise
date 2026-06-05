import { DataTableColumnHeader } from './DataTableColumnHeader';

export const columns = [
  {
    accessorKey: '_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="">
        {row.getValue('_id').slice(0, 4)}
        ...
        {row.getValue('_id').slice(-4)}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'mentor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mentor Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('mentor').firstName} {row.getValue('mentor').lastName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            ${row.getValue('price')}
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
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {new Date(row.getValue('createdAt')).toLocaleString()}
          </span>
        </div>
      );
    },
  },
];
