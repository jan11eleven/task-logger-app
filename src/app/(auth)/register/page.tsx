'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserAccountSchema } from '@/src/zodSchema/schema';
import { useToast } from '@/components/ui/use-toast';

export default function Register() {
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your zod form.
  const form = useForm<z.infer<typeof UserAccountSchema>>({
    resolver: zodResolver(UserAccountSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      middleName: '',
      lastName: '',
      birthday: '',
    },
  });

  async function onSubmit(values: z.infer<typeof UserAccountSchema>) {
    // ✅ This will be type-safe and validated.
    try {
      const rawResponse = await fetch(`users/api`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!rawResponse.ok) {
        const errorData = await rawResponse.json();
        toast({
          variant: 'destructive',
          title: 'Please fix the error.',
          description: errorData.error,
        });
        throw new Error(
          `message: HTTP Error, status: ${rawResponse.status} errorMessage: ${errorData.error}`
        );
      }

      const data = await rawResponse.json();

      console.log(data);

      toast({
        title: 'User Created!',
        description: 'Use your credentials to login to our site',
      });

      form.reset();
    } catch (error) {
      console.error('Error: ', error);
    }
  }
  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)]">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Fill up the fields below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex w-full">
                <div className="flex-1 mx-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 mx-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="johndoe@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex-1 mx-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            autoComplete="on"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                          Create a strong password.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 mx-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="on"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                          Create a strong password.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex-1 mx-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 mx-2">
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Mayer" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                          Create a strong password.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full ">
                <div className="flex-1 mx-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 mx-2">
                  <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birthday</FormLabel>
                        <FormControl>
                          <Input type="date" placeholder="Mayer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
