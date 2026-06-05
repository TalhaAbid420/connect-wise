import { Button } from '@/components/custom/Button';
import { Layout } from '@/components/custom/Layout';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/UserNav';
import useUserStore from '@/store/userStore';
import api from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Label } from 'recharts';
import { z } from 'zod';

export default function Settings() {
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(
      z.object({
        password: z.string().min(6),
        newPassword: z.string().min(6),
      }),
    ),
  });

  const submitHandler = async (data) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await api.post('/settings/update', data);
      toast.success('Password updated successfully');
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
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <UserNav />
      </Layout.Header>

      <Layout.Body>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="px-4 md:px-0">
            <div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your First Name"
                    value={user?.firstName}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your Last Name"
                    value={user?.lastName}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={user?.email}
                    disabled
                  />
                </div>
              </div>
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="mt-4 space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter current password"
                    required
                    {...register('password')}
                  />
                  {errors?.password && (
                    <p className="text-red-500 dark:text-red-400">
                      {errors?.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="newPassword"
                    placeholder="Enter new password"
                    required
                    {...register('newPassword')}
                  />
                  {errors?.newPassword && (
                    <p className="text-red-500 dark:text-red-400">
                      {errors?.newPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end items-center">
                  <Button className="ml-2" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
}
