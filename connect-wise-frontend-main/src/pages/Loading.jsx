import LoadingIcon from '@/components/LoaderIcon';
import { cn } from '@/lib/utils';

export default function LoadingPage({ className }) {
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <LoadingIcon />
      </div>
    </div>
  );
}
