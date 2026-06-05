import LoadingIcon from '@/components/LoaderIcon';
import PageHeader from '@/components/PageHeader';
import Rating from '@/components/Rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useUserStore from '@/store/userStore';
import api from '@/utils/api';
import { paginationNumbers, truncateText } from '@/utils/helpers';
import { MagnetIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Landing() {
  const pathnameID = window.location.hash;
  const params = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [featuredPage, setFeaturedPage] = useState(1);
  const [browsePage, setBrowsePage] = useState(1);
  const featuredContainer = useRef(null);

  const { isLoading: featuredIsLoading, data: featuredMentors = [] } = useQuery(
    {
      queryKey: ['featuredMentors', featuredPage],
      queryFn: async () => {
        const { data } = await api.get(
          `/mentor/featured?limit=4&page=${featuredPage}`,
        );
        return data;
      },
      keepPreviousData: true,
      staleTime: 5000,
    },
  );

  const { isLoading: mentorsIsLoading, data: mentors = [] } = useQuery({
    queryKey: ['mentors', browsePage],
    queryFn: async () => {
      const { data } = await api.get(`/mentor/list?limit=6&page=${browsePage}`);
      return data;
    },
    keepPreviousData: true,
    staleTime: 5000,
  });

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQuery = formData.get('search');
    navigate(`/search`, {
      state: { searchQuery },
    });
  };

  const handleProfileView = (mentor) => {
    navigate(`/profile`, {
      state: { mentor },
    });
  };

  useEffect(() => {
    if (pathnameID === '#browse-mentors') {
      const browseMentors = document.getElementById('browse-mentors');
      browseMentors.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathnameID, params]);

  const joinLink = user
    ? user?.role == 'mentor'
      ? '/mentor/dashboard'
      : '/dashboard'
    : '/register';

  return (
    <div className="flex flex-col">
      <PageHeader />
      <main className="flex-1">
        <section className="w-full h-[100dvh] max-h-[1024px] grid place-content-center container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Find the perfect mentor for your growth
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Connect with experienced professionals who can guide you on your
                journey to success.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  to={joinLink}
                >
                  Join Now
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border  border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  to="/about"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
              height={800}
              src="/assets/images/work_7.png"
              width={800}
            />
          </div>
        </section>
        <section
          className="w-full py-12 md:py-20 bg-gray-100 dark:bg-gray-800"
          ref={featuredContainer}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Mentors
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Connect with experienced professionals who can guide you on
                  your journey to success.
                </p>
              </div>
            </div>
            {featuredIsLoading && (
              <div className="flex justify-center items-center w-full h-32">
                <LoadingIcon />
              </div>
            )}
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {featuredMentors?.docs?.map((mentor) => (
                <Card key={mentor._id}>
                  <CardHeader className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage alt={mentor.name} src={mentor.avatar} />
                        <AvatarFallback>
                          {mentor.firstName[0]}
                          {mentor.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">
                          {mentor.firstName} {mentor.lastName}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {mentor.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Rating value={mentor.rating || 5} />
                      </div>
                      <span>
                        {mentor.rating || 5} ({mentor.reviews.length || 0}{' '}
                        reviews)
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      {truncateText(mentor.bio, 150)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex items-center justify-between">
                      <a
                        className="inline-block bg-none text-white border-none cursor-pointer"
                        onClick={() => handleProfileView(mentor)}
                      >
                        <Button asChild={true}>
                          <span>View Profile</span>
                        </Button>
                      </a>
                      {/* Price /month */}
                      <span className="text-gray-500 dark:text-gray-400">
                        ${mentor.pricePerMonth}/month
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Pagination>
              <PaginationContent>
                {featuredMentors?.hasPrevPage && (
                  <PaginationItem>
                    <PaginationPrevious
                      className={'hover:bg-gray-900'}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        featuredContainer.current.scrollIntoView({
                          behavior: 'smooth',
                        });
                        setFeaturedPage((prev) => prev - 1);
                      }}
                    />
                  </PaginationItem>
                )}

                {featuredMentors?.totalPages > 1 &&
                  paginationNumbers(
                    featuredPage,
                    featuredMentors.totalPages,
                  ).map((page, index) => (
                    <PaginationItem key={index}>
                      {page === '...' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          className={
                            page === featuredPage
                              ? 'bg-gray-900'
                              : 'hover:bg-gray-900'
                          }
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            featuredContainer.current.scrollIntoView({
                              behavior: 'smooth',
                            });
                            setFeaturedPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                {featuredMentors?.hasNextPage && (
                  <PaginationItem>
                    <PaginationNext
                      className={'hover:bg-gray-900'}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        featuredContainer.current.scrollIntoView({
                          behavior: 'smooth',
                        });
                        setFeaturedPage((prev) => prev + 1);
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </section>
        <section id="browse-mentors" className="w-full py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Browse Mentors
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Find the perfect mentor for your needs and schedule a session
                  today.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Search by expertise or availability"
                    type="text"
                    name="search"
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
            {mentorsIsLoading && (
              <div className="flex justify-center items-center w-full h-32">
                <LoadingIcon />
              </div>
            )}
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              {mentors?.docs?.map((mentor) => (
                <Card key={mentor._id}>
                  <CardHeader className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage alt={mentor.name} src={mentor.avatar} />
                        <AvatarFallback>
                          {mentor.firstName[0]}
                          {mentor.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">
                          {mentor.firstName} {mentor.lastName}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {mentor.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Rating value={mentor.rating} />
                      </div>
                      <span>
                        {mentor.rating} ({mentor.reviews.length} reviews)
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      {truncateText(mentor.bio, 120)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full flex justify-between items-center">
                      <button
                        className="bg-none text-white border-none"
                        onClick={() => handleProfileView(mentor)}
                      >
                        <Button asChild={true}>
                          <span>View Profile</span>
                        </Button>
                      </button>
                      {/* Price /month */}
                      <span className="text-gray-500 dark:text-gray-400">
                        ${mentor.pricePerMonth}/month
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Pagination>
              <PaginationContent>
                {mentors?.hasPrevPage && (
                  <PaginationItem>
                    <PaginationPrevious
                      className={'hover:bg-gray-900'}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById('browse-mentors')
                          .scrollIntoView({
                            behavior: 'smooth',
                          });
                        setBrowsePage((prev) => prev - 1);
                      }}
                    />
                  </PaginationItem>
                )}

                {mentors?.totalPages > 1 &&
                  paginationNumbers(browsePage, mentors.totalPages).map(
                    (page, index) => (
                      <PaginationItem key={index}>
                        {page === '...' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            className={
                              page === browsePage
                                ? 'bg-gray-900'
                                : 'hover:bg-gray-900'
                            }
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById('browse-mentors')
                                .scrollIntoView({
                                  behavior: 'smooth',
                                });
                              setBrowsePage(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ),
                  )}

                {mentors?.hasNextPage && (
                  <PaginationItem>
                    <PaginationNext
                      className={'hover:bg-gray-900'}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById('browse-mentors')
                          .scrollIntoView({
                            behavior: 'smooth',
                          });
                        setBrowsePage((prev) => prev + 1);
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </section>
        {/* a horizontal line fading on the both left and right corners */}
        <div className="w-full h-0.5 bg-gradient-to-r from-gray-100 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 bg-opacity-50" />
        <section className="py-12 my-10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Get the latest updates
                  </h1>
                  <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
                    Subscribe to our newsletter to receive the latest updates.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2 mx-auto">
                  <form className="flex space-x-2">
                    <Input
                      className="max-w-lg flex-1 bg-gray-800 text-white border-gray-900"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button className="bg-white text-black" type="submit">
                      Join Now
                    </Button>
                  </form>
                  <p className="text-xs text-zinc-200 dark:text-zinc-100">
                    By subscribing, you agree to our{' '}
                    <a
                      className="underline underline-offset-2 text-white"
                      href="#"
                    >
                      Terms & Conditions
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 bg-gray-900 dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-xl flex items-center justify-center font-bold tracking-tighter">
              <MagnetIcon className="h-8 w-8" />
              ConnectWise
            </h2>
            <div className="text-gray-500 dark:text-gray-400">
              &copy; 2024 ConnectWise. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
