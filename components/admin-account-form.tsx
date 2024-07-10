'use client';

import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { ArrowUpDown, Check, ChevronLeft, RefreshCw } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import FormFieldInput from '@/components/form-field/input';

import { cn } from '@/lib/utils';
import { adminAccountSchema } from '@/schema/accounts';

interface AdminAccountFormProps {
  form: UseFormReturn<z.infer<typeof adminAccountSchema>>;
  onSubmit: (values: z.infer<typeof adminAccountSchema>) => void;
  isPending: boolean;
  aparatDesaList?: string[];
}

export default function AdminAccountForm({
  form,
  onSubmit,
  isPending,
  aparatDesaList,
}: AdminAccountFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full grid flex-1 auto-rows-max gap-4'
      >
        <div className='flex items-center gap-4'>
          <Link
            href='/admin/account/admins'
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Back</span>
          </Link>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            Tambah Akun Admin
          </h1>
          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Link
              href='/admin/account/admins'
              className={buttonVariants({ variant: 'outline' })}
            >
              Batal
            </Link>
            <Button type='submit' disabled={isPending}>
              {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
              Simpan
            </Button>
          </div>
        </div>
        <div className='grid gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Data Aparat Desa</CardTitle>
              <CardDescription>
                Silahkan masukkan data aparat desa
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid gap-3'>
                <Popover open={open} onOpenChange={setOpen}>
                  <p className='text-sm font-medium'>Pilih Aparat Desa</p>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-expanded={open}
                      className='w-full justify-between'
                    >
                      {value
                        ? aparatDesaList?.find((item) => item === value)
                        : 'Silahkan pilih'}
                      <ArrowUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  {!value && (
                    <p className={'text-sm font-medium text-destructive'}>
                      Pilih aparat desa terlebih dahulu
                    </p>
                  )}
                  <PopoverContent className='popover-content-width-full p-0'>
                    <Command>
                      <CommandInput placeholder='Cari...' className='h-9' />
                      <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {aparatDesaList?.map((item) => (
                            <CommandItem
                              key={item}
                              value={item}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? '' : currentValue
                                );
                                form.setValue(
                                  'aparatDesaId',
                                  currentValue.split(' - ')[0]
                                );
                                form.setValue(
                                  'nama',
                                  currentValue.split(' - ')[1]
                                );
                                setOpen(false);
                              }}
                            >
                              {item}
                              <Check
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  value === item ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                  <p className='text-[0.8rem] font-medium text-muted-foreground'>
                    Silahkan pilih aparat desa
                  </p>
                </Popover>
              </div>
              <div className='grid grid-cols-3 gap-3'>
                <FormFieldInput<typeof adminAccountSchema>
                  form={form}
                  name='username'
                  label='Username'
                  placeholder='Username Akun'
                  maxLength={30}
                  description='Username Akun'
                />
                <FormFieldInput<typeof adminAccountSchema>
                  form={form}
                  name='aparatDesaId'
                  label='ID'
                  placeholder='ID Aparat Desa'
                  maxLength={16}
                  description='ID Aparat Desa'
                  disabled={true}
                />
                <FormFieldInput<typeof adminAccountSchema>
                  form={form}
                  name='nama'
                  label='Nama'
                  placeholder='Nama lengkap'
                  maxLength={255}
                  description='Nama Lengkap Penduduk'
                  disabled={true}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
