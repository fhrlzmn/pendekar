'use client';

import { useTransition } from 'react';
import { RefreshCw, Trash } from 'lucide-react';

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

import { usePathname, useRouter } from 'next/navigation';
import { deleteAparatDesa } from '@/actions/aparatdesa';

export default function DeleteAparatDesa({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const action = () => {
    startTransition(() => {
      deleteAparatDesa(id).then((data) => {
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

        if (pathname === `/admin/aparatdesa/${id}`) {
          router.push('/admin/aparatdesa');
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
            Anda akan menghapus Aparat Desa dengan ID {id}. Tindakan ini tidak
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
