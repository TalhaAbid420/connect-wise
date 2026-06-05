import PageHeader from '@/components/PageHeader';
import Rating from '@/components/Rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import expLevels from '@/data/expLevels';
import useUserStore from '@/store/userStore';
import api from '@/utils/api';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  const mentor = location.state?.mentor;
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  if (!mentor) {
    return <Navigate to={'/'} />;
  }

  const handleBuy = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const { data } = await api.post('/buy', {
      mentorID: mentor._id,
    });

    if (data?.redirectURL) {
      window.location.href = data.redirectURL;
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <PageHeader />
      <div className="w-full container px-4 md:px-6">
        <div className="relative h-[300px] sm:h-[400px]">
          <img
            src="/cover-example.jpg"
            alt="Cover Image"
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background to-transparent p-6 sm:p-8 flex items-end justify-between">
            <div className="flex items-center gap-4 justify-start">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <AvatarImage alt={mentor.firstName} src={mentor.avatar} />
                <AvatarFallback>
                  {mentor.firstName[0]} {mentor.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <Link to={mentor.linkedInProfile} target="_blank">
              <div className=" rounded py-3 pl-5">
                <IconBrandLinkedin className="w-10 h-10 text-white" />
              </div>
            </Link>
          </div>
        </div>
        <div className="grid gap-8 p-4 sm:p-8">
          {/* Buy */}
          <div className="flex items-center justify-between mt-8">
            <div>
              <h3 className="text-4xl mb-2 font-bold">
                {mentor.firstName} {mentor.lastName}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{mentor.title}</p>
              <p className="text-primary mb-2">
                {expLevels[mentor.level]} years of experience
              </p>
              <div className="flex flex-row items-center gap-4 text-gray-500 dark:text-gray-400 mr-auto">
                <div className="flex items-center gap-1">
                  <Rating value={mentor.rating || 5} />
                </div>
                <span>
                  {mentor.rating || 5} ({mentor.reviews.length || 0} reviews)
                </span>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-md"
              onClick={handleBuy}
            >
              <span>Subscribe for ${mentor.pricePerMonth}</span>
            </button>
          </div>
        </div>
        <div className="grid gap-4 p-4 sm:p-8">
          <h2 className="text-2xl font-bold">About</h2>
          <div>
            <p className="text-lg leading-normal text-muted-foreground">
              {mentor.bio}
            </p>
          </div>
        </div>
        <div className="grid gap-8 p-4 sm:p-8">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="grid gap-6">
            {
              // Show a message if there are no reviews
              mentor.reviews.length === 0 && (
                <p className="text-lg leading-normal text-muted-foreground">
                  No reviews yet
                </p>
              )
            }
            {mentor.reviews.map((review) => (
              <div key={review._id} className="flex gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={review?.user?.avatar} />
                  <AvatarFallback>
                    {review?.user?.firstName[0]}
                    {review?.user?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </h3>
                    <div className="flex items-center gap-0.5 text-primary">
                      <Rating value={review.rating || 5} />
                    </div>
                  </div>
                  <div className="text-sm leading-loose text-muted-foreground">
                    <p>{review.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
