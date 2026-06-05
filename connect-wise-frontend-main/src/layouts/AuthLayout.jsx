import PageHeader from '@/components/PageHeader';
import { AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <>
      <PageHeader />
      <main className="my-10">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
    </>
  );
}
