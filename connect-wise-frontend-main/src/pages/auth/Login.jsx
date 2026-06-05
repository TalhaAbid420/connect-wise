import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUserStore from '@/store/userStore';
import api from '@/utils/api';
import { decodeJWT } from '@/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

export default function Login() {
  const login = useUserStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      }),
    ),
  });

  const onValid = async (data) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data: res } = await api.post('/auth/login', data);
      await login(res.token);
      let redirectLink = '/dashboard';
      const decoded = decodeJWT(res.token);
      if (decoded && decoded.role === 'mentor') {
        redirectLink = '/mentor/dashboard';
      }
      navigate(redirectLink, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          'An error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back! Sign in to your account.
        </p>
        <a className="mx-2" href="/sign-up">
          Don&apos;t have an account? Sign up
        </a>
      </div>
      <div className="px-4 md:px-0">
        <div>
          <form onSubmit={handleSubmit(onValid)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                {...register('email', { required: 'Email is required' })}
              />
              {errors?.email && (
                <p className="text-red-500 dark:text-red-400">
                  {errors?.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              {errors?.password && (
                <p className="text-red-500 dark:text-red-400">
                  {errors?.password.message}
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
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
