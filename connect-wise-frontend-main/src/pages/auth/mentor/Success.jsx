import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="container flex flex-col items-center justify-center my-36">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center">Success</h2>
          <div className="text-center">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p>
              Your application has been submitted. We will review it and get
              back to you shortly.
            </p>
          </div>
          <Link className="block space-y-10" href="/">
            <Button className="w-full">Return to the Home Page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
