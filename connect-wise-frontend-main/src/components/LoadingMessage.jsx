import { Skeleton } from './ui/skeleton';

const LoadingMessage = () => (
  <div className="flex flex-col items-center gap-2">
    <Skeleton className="w-72 h-4 bg-[#020817]" />
    <Skeleton className="w-72 h-4 bg-[#020817]" />
  </div>
);

export default LoadingMessage;
