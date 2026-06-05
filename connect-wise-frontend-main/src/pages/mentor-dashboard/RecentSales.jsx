import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatMoney } from '@/utils/helpers';

export function RecentSales({ recentSales }) {
  return (
    <div className="space-y-8">
      {recentSales?.map((sale) => (
        <div key={sale._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale?.user?.avatar} alt="Avatar" />
            <AvatarFallback>
              {sale?.user?.firstName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.user.firstName} {sale.user.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{sale?.user?.email}</p>
          </div>
          <div className="ml-auto font-medium">{formatMoney(sale.price)}</div>
        </div>
      ))}
    </div>
  );
}
