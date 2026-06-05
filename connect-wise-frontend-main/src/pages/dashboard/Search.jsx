import { Layout } from '@/components/custom/Layout';
import LoadingIcon from '@/components/LoaderIcon';
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
import { UserNav } from '@/components/UserNav';
import api from '@/utils/api';
import { paginationNumbers, truncateText } from '@/utils/helpers';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const [browsePage, setBrowsePage] = useState(1);

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

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <h1 className="text-2xl font-bold tracking-tight">Search</h1>
        <UserNav />
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <section id="browse-mentors" className="w-full py-8">
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
                        <Button>View Profile</Button>
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
                      onClick={() => setBrowsePage((prev) => prev - 1)}
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
                            onClick={() => setBrowsePage(page)}
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
                      onClick={() => setBrowsePage((prev) => prev + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </Layout.Body>
    </Layout>
  );
}
