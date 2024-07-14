'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { RefreshCw } from 'lucide-react';

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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { tolakPermohonan } from '@/actions/cetak-surat';

export default function TolakPermohonan({ id }: { id: number }) {
  const [keterangan, setKeterangan] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeterangan(event.target.value);
  };

  const handleClick = () => {
    startTransition(() => {
      tolakPermohonan(id, keterangan).then((data) => {
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
          router.push('/admin/surat/permohonan');
        }
      });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending}>
        <Button type='button' variant='destructive' size='default'>
          {isPending && <RefreshCw className='h-4 w-4 mr-2 animate-spin' />}
          Tolak
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan menolak permohonan ini. Tindakan ini tidak dapat
            dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='grid gap-3'>
          <Label htmlFor='keterangan'>Keterangan</Label>
          <Input
            id='keterangan'
            name='keterangan'
            value={keterangan}
            onChange={handleChange}
          />
        </div>
        <AlertDialogFooter className='space-x-2'>
          <AlertDialogCancel
            type='button'
            className={buttonVariants({ variant: 'outline' })}
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            type='submit'
            onClick={handleClick}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Tolak
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
