'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import AdminAccountForm from '@/components/admin-account-form';

import { AparatDesa } from '@prisma/client';
import { adminAccountSchema } from '@/schema/accounts';
import { generateAdminAccount } from '@/actions/accounts';

interface AddAdminAccountProps {
  aparatDesa: AparatDesa[];
}

export default function AddAdminAccountForm({
  aparatDesa,
}: AddAdminAccountProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const aparatDesaList = aparatDesa.map(
    (value) => `${value.id} - ${value.nama} - ${value.nik}`
  );

  const form = useForm<z.infer<typeof adminAccountSchema>>({
    resolver: zodResolver(adminAccountSchema),
    defaultValues: {
      username: '',
      nama: '',
      aparatDesaId: '',
    },
  });

  const onSubmit = (values: z.infer<typeof adminAccountSchema>) => {
    startTransition(() => {
      generateAdminAccount(values).then((data) => {
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
            title: `Password: ${data.password}`,
            description: `${data.success}, gunakan password ini untuk login`,
            className:
              'flex fixed justify-center items-center gap-4 inset-0 mx-auto mt-16 h-max w-max',
            action: (
              <ToastAction altText='Kembali' asChild>
                <Link href='/admin/account/admins'>Kembali</Link>
              </ToastAction>
            ),
          });
        }
      });
    });
  };

  return (
    <AdminAccountForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      aparatDesaList={aparatDesaList}
    />
  );
}
