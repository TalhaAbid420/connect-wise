import { Suspense, useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIcon from './components/LoaderIcon';
import router from './router';
import useUserStore from './store/userStore';
import { queryClient } from './utils/reactQuery';

function App() {
  const user = useUserStore((state) => state?.user);
  const refresh = useUserStore((state) => state?.refresh);

  useEffect(() => {
    let ctrl;
    if (!user) {
      ctrl = new AbortController();
      refresh(ctrl.signal);
    }
    return () => {
      if (ctrl) {
        ctrl.abort();
      }
    };
  }, [user, refresh]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen bg-[#020817]">
              <LoadingIcon />
            </div>
          }
        >
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App;
