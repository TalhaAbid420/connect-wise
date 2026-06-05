import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { DataTableViewOptions } from './DataTableViewOptions';

export function DataTableToolbar({ table }) {
  const [search, setSearch] = useState('');

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            table?.setGlobalFilter(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
