import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Failure() {
  return (
    <div className="container flex flex-col items-center justify-center my-36">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center">Failure</h2>
          <div className="text-center">
            <svg
              className="w-20 h-20 text-red-500 dark:text-red-400 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <p>Oops! Something went wrong. Please try again.</p>
          </div>
          <Link className="block space-y-10" to="/">
            <Button className="w-full">Return to the Home Page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Failure;
