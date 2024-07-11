'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RefreshCw } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { adminLoginSchema } from '@/schema/login';
import { adminLogin } from '@/actions/login';

export default function AdminLoginForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof adminLoginSchema>) => {
    startTransition(() => {
      adminLogin(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);

        if (data?.success) {
          router.push('/admin/dashboard');
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='w-full mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Admin Login</CardTitle>
            <CardDescription>
              Masukkan username dan password untuk masuk
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='username'
                        type='text'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Silahkan masukkan username
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='********'
                        type='password'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Silahkan masukkan password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
              Masuk
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
