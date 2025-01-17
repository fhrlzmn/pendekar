'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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
import { Button, buttonVariants } from '@/components/ui/button';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';

import { userLoginSchema } from '@/schema/login';
import { userLogin } from '@/actions/login';

export default function UserLoginForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      nik: '',
      pin: '',
    },
  });

  const onSubmit = (values: z.infer<typeof userLoginSchema>) => {
    startTransition(() => {
      userLogin(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);

        if (data?.success) {
          router.push('/user/dashboard');
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='w-full mx-auto max-w-sm'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>
              Selamat Datang di PENDEKAR
            </CardTitle>
            <CardDescription>
              Untuk masyarakat, silahkan login menggunakan NIK dan PIN
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='nik'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='3201234567890001'
                        type='text'
                        maxLength={16}
                        disabled={isPending}
                        inputMode='numeric'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Silahkan masukkan nomor NIK
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='pin'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIN</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='******'
                        type='password'
                        maxLength={6}
                        inputMode='numeric'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Silahkan masukkan PIN</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </CardContent>
          <CardContent>
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
              Masuk
            </Button>
          </CardContent>
          <CardContent className='text-center'>
            <span className='text-sm'>
              Belum punya akun?
              <Link
                href='/auth/register/user'
                className={buttonVariants({
                  variant: 'link',
                  className: 'underline',
                })}
              >
                Daftar disini
              </Link>
            </span>
          </CardContent>
          <CardFooter className='flex flex-col items-center gap-4'>
            <span className='text-sm'>atau</span>
            <Link
              href='/auth/login/admin'
              className={buttonVariants({
                variant: 'outline',
                className: 'w-full',
              })}
            >
              Login sebagai Admin
            </Link>
          </CardFooter>
        </div>
      </form>
    </Form>
  );
}
