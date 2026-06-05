import { Layout } from '@/components/custom/Layout';
import LoadingIcon from '@/components/LoaderIcon';
import { UserNav } from '@/components/UserNav';
import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { columns } from './components/columns';
import { DataTable } from './components/DataTable';

export default function Orders() {
  const [rows, setRows] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['info', 'orders'],
    queryFn: async () => {
      const { data } = await api.get(`/info/orders`);
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <h1 className="text-2xl font-bold tracking-tight">Received Orders</h1>
        <UserNav />
      </Layout.Header>

      <Layout.Body>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {isLoading ? (
            <div className="flex justify-center items-center w-full h-32">
              <LoadingIcon />
            </div>
          ) : (
            <DataTable data={rows} columns={columns} />
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
}
