import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import useUserStore from '@/store/userStore';
import api from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const logOut = useUserStore((state) => state.logOut);
  const formElement = useRef(null);

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(
      z.object({
        avatar: z
          .any()
          .refine(
            (file) =>
              file[0].type.includes('image/png') ||
              file[0].type.includes('image/jpeg') ||
              file[0].size < 5000000,
            {
              message: 'Avatar must be an image',
            },
          ),
        firstName: z.string().min(2).max(80),
        lastName: z.string().min(2).max(80),
        email: z.string().email(),
        password: z.string().min(6),
        linkedInProfile: z.string().optional().default(''),
        bio: z.string().optional().default(''),
        gender: z.enum(['Male', 'Female']),
      }),
    ),
  });

  const onValid = async (data) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      logOut();
      const formData = new FormData(formElement.current);
      await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/login', { replace: true, relative: false });
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
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form below to join our mentorship program.
        </p>
        <a className="mx-2" href="/sign-in">
          Already have an account? Sign in
        </a>
      </div>
      <div className="px-4 md:px-0">
        <div>
          <form
            ref={formElement}
            onSubmit={handleSubmit(onValid)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <Input
                id="avatar"
                name="avatar"
                type="file"
                placeholder="Enter your First Name"
                className="cursor-pointer"
                required
                {...register('avatar', {
                  required: 'First Name is required',
                })}
              />
              {errors?.avatar && (
                <p className="text-red-500 dark:text-red-400">
                  {errors?.avatar.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your First Name"
                required
                {...register('firstName', {
                  required: 'First Name is required',
                })}
              />
              {errors?.firstName && (
                <p className="text-red-500 dark:text-red-400">
                  {errors?.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your Last Name"
                required
                {...register('lastName', {
                  required: 'Last Name is required',
                })}
              />
              {errors?.lastName && (
                <p className="text-red-500 dark:text-red-400">
                  {errors?.lastName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
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
                name="password"
                placeholder="Enter your password"
                type="password"
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
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Controller
                control={control}
                id="gender"
                name="gender"
                render={({ field }) => {
                  return (
                    <Select required onValueChange={field.onChange} {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  );
                }}
              ></Controller>

              {errors?.gender && (
                <p className="text-red-500 dark:text-red-400">
                  {errors?.gender.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                name="linkedin"
                placeholder="Enter your LinkedIn profile URL"
                {...register('linkedin')}
              />
              {errors?.linkedin && (
                <p className="text-red-500 dark:text-red-400">
                  {errors?.linkedin.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="min-h-[100px]"
                name="bio"
                id="bio"
                placeholder="Tell us about yourself"
                {...register('bio')}
              />
              {errors?.bio && (
                <p className="text-red-500 dark:text-red-400">
                  {errors?.bio.message}
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
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
