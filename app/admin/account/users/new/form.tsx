'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import AddUserAccount from '@/components/user-account-form';

import { Penduduk } from '@prisma/client';
import { userAccountSchema } from '@/schema/accounts';
import { generateUserAccount } from '@/actions/accounts';
import Link from 'next/link';

interface AddUserAccountProps {
  penduduk: Penduduk[];
}

export default function AddUserAccountForm({ penduduk }: AddUserAccountProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const pendudukList = penduduk.map((value) => `${value.nik} - ${value.nama}`);

  const form = useForm<z.infer<typeof userAccountSchema>>({
    resolver: zodResolver(userAccountSchema),
    defaultValues: {
      nik: '',
      nama: '',
    },
  });

  const onSubmit = (values: z.infer<typeof userAccountSchema>) => {
    startTransition(() => {
      generateUserAccount(values).then((data) => {
        if (data.error) {
          toast({
            variant: 'destructive',
            title: 'Oops! Ada kesalahan',
            description: data.error,
          });
        }
        if (data.success) {
          toast({
            variant: 'success',
            title: `PIN: ${data.pin}`,
            description: `${data.success}, tulis PIN ini untuk login`,
            className:
              'flex fixed justify-center items-center gap-4 inset-0 mx-auto mt-16 h-max w-max',
            action: (
              <ToastAction altText='Kembali' asChild>
                <Link href='/admin/account/users'>Kembali</Link>
              </ToastAction>
            ),
          });
        }
      });
    });
  };

  return (
    <AddUserAccount
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      pendudukList={pendudukList}
    />
  );
}
