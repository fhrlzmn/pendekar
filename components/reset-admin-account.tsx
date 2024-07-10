'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { RefreshCcw, RefreshCw } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { resetAdminAccount } from '@/actions/accounts';

export default function ResetAdminAccount({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const action = () => {
    startTransition(() => {
      resetAdminAccount(id).then((data) => {
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
              <ToastAction altText='OK' asChild>
                <Link href='/admin/account/admins'>OK</Link>
              </ToastAction>
            ),
          });
        }
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending}>
        <Button type='button' variant='default' size='icon'>
          {isPending ? (
            <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <RefreshCcw className='h-4 w-4' />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan melakukan reset password untuk akun ini. Tindakan ini
            tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form action={action}>
            <AlertDialogCancel
              type='button'
              className={buttonVariants({ variant: 'outline' })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type='submit'
              className={buttonVariants({ variant: 'default' })}
            >
              Reset
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
