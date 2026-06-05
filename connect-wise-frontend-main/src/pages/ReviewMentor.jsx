import { Button } from '@/components/custom/Button';
import PageHeader from '@/components/PageHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import expLevels from '@/data/expLevels';
import useUserStore from '@/store/userStore';
import api from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-dropdown-menu';
import { IconBrandLinkedin } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

export default function Profile() {
  const location = useLocation();
  const mentor = location.state?.mentor;
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(
      z.object({
        rating: z.number().min(1).max(5),
        review: z.string().min(10).max(500),
      }),
    ),
  });

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  if (!mentor) {
    return <Navigate to={'/'} />;
  }

  const onSubmit = async (data) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      await api.post('/mentor/review', {
        chatID: mentor.chatID,
        rating: data.rating,
        review: data.review,
      });
      toast.success('Review submitted successfully');
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          'An error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
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
                <AvatarImage alt={mentor?.firstName} src={mentor?.avatar} />
                <AvatarFallback>
                  {mentor?.firstName[0].toUpperCase()}
                  {mentor?.lastName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <Link to={mentor?.linkedInProfile} target="_blank">
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
                {mentor?.firstName} {mentor?.lastName}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {mentor?.title}
              </p>
              <p className="text-primary mb-2">
                {expLevels[mentor?.level]} years of experience
              </p>
            </div>
          </div>
        </div>
        {/* Buy */}
        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-4xl text-center font-bold text-primary my-8">
            Review Mentor
          </h1>
          <div className="px-4 md:px-0 my-4 mb-24 w-full max-w-lg">
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    placeholder="Enter your rating"
                    required
                    min={1}
                    max={5}
                    {...register('rating', {
                      required: 'Email is required',
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: 'Rating must be between 1 and 5',
                      },
                      max: {
                        value: 5,
                        message: 'Rating must be between 1 and 5',
                      },
                    })}
                  />
                  {errors?.rating && (
                    <p className="text-red-500 dark:text-red-400">
                      {errors?.rating.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review">Review</Label>
                  <Textarea
                    id="review"
                    placeholder="Enter your review"
                    name="review"
                    {...register('review', {
                      required: 'Review is required',
                      minLength: {
                        value: 10,
                        message: 'Review must be at least 10 characters',
                      },
                      maxLength: {
                        value: 500,
                        message: 'Review must be at most 500 characters',
                      },
                    })}
                    required
                  />
                  {errors?.review && (
                    <p className="text-red-500 dark:text-red-400">
                      {errors?.review.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end items-center">
                  <a href="../">
                    <Button className="mr-2" type="button" variant="outline">
                      Back
                    </Button>
                  </a>
                  <Button className="ml-2" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
