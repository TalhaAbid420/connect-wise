import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/userStore';
import api from '@/utils/api';
import { useNavigate } from 'react-router-dom';

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Premium() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleBuy = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const { data } = await api.get('/buy/premium');

    if (data?.redirectURL) {
      window.location.href = data.redirectURL;
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <PageHeader />
      <section className="min-h-screen w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="w-full mt-8 md:grid-cols-3 md:gap-8">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
                Go Premium
              </h1>

              <p className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
                Buy Premium to unlock all features
              </p>
            </div>
            <div className="relative p-6 shadow-lg rounded-lg dark:bg-zinc-850 border border-purple-500">
              <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-[6rem] transform -translate-x-1/2 -translate-y-1/2">
                Premium
              </div>
              <div>
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="mt-4 text-zinc-600 dark:text-zinc-400">
                  <span className="text-4xl font-bold">$5</span>/ month
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                    Unlimited Withdrawals
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                    List as featured
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                  onClick={handleBuy}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
