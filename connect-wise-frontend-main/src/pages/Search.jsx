import LoadingIcon from '@/components/LoaderIcon';
import PageHeader from '@/components/PageHeader';
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
import api from '@/utils/api';
import { paginationNumbers, truncateText } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export default function About() {
  const location = useLocation();
  const [search, setSearch] = useState(location.state.searchQuery || '');
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState(location.state.searchQuery || '');
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);

  const { data: mentorsList = [] } = useQuery({
    queryKey: ['mentors', 1],
    queryFn: async () => {
      const { data } = await api.get(`/mentor/featured?limit=6&page=${1}`);
      return data;
    },
    keepPreviousData: true,
    staleTime: 5000,
  });

  const { isLoading, data: mentorsSearch = [] } = useQuery({
    queryKey: ['search', query, pageNumber],
    queryFn: async () => {
      const { data } = await api.post(`/mentor/search`, {
        page: pageNumber,
        query,
      });
      return data;
    },
    keepPreviousData: true,
    refetchInterval: false,
    enabled: query?.length > 2,
  });

  useEffect(() => {
    if (mentorsSearch?.docs?.length) {
      setMentors(mentorsSearch);
    }
  }, [mentorsSearch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length < 3) {
      return setMentors(mentorsList);
    }
    setPageNumber(1);
    setQuery(search);
  };

  const handleProfileView = (mentor) => {
    navigate(`/profile`, {
      state: { mentor },
    });
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <PageHeader />
      <main className="flex-1">
        <section id="browse-mentors" className="w-full py-6">
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
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Search by expertise or availability"
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
            {isLoading && (
              <div className="flex justify-center items-center w-full h-32">
                <LoadingIcon />
              </div>
            )}
            {(mentors?.docs?.length === 0 || query?.length < 3) && (
              <div className="flex justify-center items-center w-full h-32">
                <p className="text-gray-500 dark:text-gray-400">
                  No mentors found. Try searching for something else.
                </p>
              </div>
            )}
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              {mentors?.docs?.map((mentor) => (
                <Card key={mentor._id}>
                  <CardHeader className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          alt={mentor.firstName}
                          src={mentor.avatar}
                        />
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
                        {[...Array(5)].map((_, index) => (
                          <svg
                            className="h-4 w-4 text-yellow-500 dark:text-yellow-400"
                            fill={index < 4 ? 'currentColor' : 'none'}
                            key={index}
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2"
                              fill={
                                index + 1 < mentor.rating
                                  ? 'currentColor'
                                  : 'none'
                              }
                            />
                          </svg>
                        ))}
                      </div>
                      <span>
                        {mentor.rating || 5} ({mentor.reviews.length} reviews)
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
                      <Button onClick={() => handleProfileView(mentor)}>
                        View Profile
                      </Button>
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
                      onClick={() => setPageNumber((prev) => prev - 1)}
                    />
                  </PaginationItem>
                )}

                {mentors?.totalPages > 1 &&
                  paginationNumbers(pageNumber, mentors.totalPages).map(
                    (page, index) => (
                      <PaginationItem key={index}>
                        {page === '...' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            className={
                              page === pageNumber
                                ? 'bg-gray-900'
                                : 'hover:bg-gray-900'
                            }
                            href="#"
                            onClick={() => setPageNumber(page)}
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
                      onClick={() => setPageNumber((prev) => prev + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </main>
    </div>
  );
}
