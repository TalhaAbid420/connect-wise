import LoadingIcon from '@/components/LoaderIcon';
import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export function Overview() {
  const [rows, setRows] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['mentor', 'overview'],
    queryFn: async () => {
      const { data } = await api.get(`/mentor/overview`);
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-[350px]">
        <LoadingIcon />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={rows}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
