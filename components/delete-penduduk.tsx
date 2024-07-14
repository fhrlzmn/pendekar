'use client';

import { useTransition } from 'react';
import { RefreshCw, RotateCw, Trash } from 'lucide-react';

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

import { deletePenduduk } from '@/actions/penduduk';
import { usePathname, useRouter } from 'next/navigation';

export default function DeletePenduduk({ nik }: { nik: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const action = () => {
    startTransition(() => {
      deletePenduduk(nik).then((data) => {
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
            title: 'Berhasil',
            description: data.success,
          });
        }

        if (pathname === `/admin/penduduk/${nik}`) {
          router.push('/admin/penduduk');
        }
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending}>
        <Button type='button' variant='destructive' size='sm'>
          {isPending ? (
            <RefreshCw className='h-3 w-3 animate-spin' />
          ) : (
            <Trash className='h-3 w-3' />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan menghapus penduduk dengan NIK {nik}. Tindakan ini tidak
            dapat dibatalkan.
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
              className={buttonVariants({ variant: 'destructive' })}
            >
              Hapus
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
