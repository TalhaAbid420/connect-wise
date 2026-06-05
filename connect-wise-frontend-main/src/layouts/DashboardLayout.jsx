import Sidebar from '@/components/SideBar';
import mentorSideLinks from '@/data/mentorSideLinks';
import sideLinks from '@/data/sideLinks';
import useIsCollapsed from '@/hooks/useIsCollapsed';
import { AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout({ forMentor = false }) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar
        sideLinks={forMentor ? mentorSideLinks : sideLinks}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? 'md:ml-14' : 'md:ml-64'
        } h-full`}
      >
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
    </div>
  );
}
