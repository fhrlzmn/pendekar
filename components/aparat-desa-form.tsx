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
import FormFieldSelect from '@/components/form-field/select';

import { cn } from '@/lib/utils';

import { aparatDesaSchema } from '@/schema/aparatdesa';
import { JabatanEnum } from '@/enums/aparatdesa';

interface AparatDesaFormProps {
  type: 'add' | 'edit';
  form: UseFormReturn<z.infer<typeof aparatDesaSchema>>;
  onSubmit: (values: z.infer<typeof aparatDesaSchema>) => void;
  isPending: boolean;
  pendudukList?: string[];
}

export default function AparatDesaForm({
  type,
  form,
  onSubmit,
  isPending,
  pendudukList,
}: AparatDesaFormProps) {
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
            href='/admin/aparatdesa'
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Back</span>
          </Link>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            {type === 'add' ? 'Tambah Aparat Desa' : 'Edit Aparat Desa'}
          </h1>
          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Link
              href='/admin/aparatdesa'
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
              <CardTitle>Data Penduduk</CardTitle>
              <CardDescription>
                Silahkan masukkan data penduduk yang akan dijadikan aparat desa
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid gap-3'>
                <Popover open={open} onOpenChange={setOpen}>
                  <p className='text-sm font-medium'>Pilih Penduduk</p>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      aria-expanded={open}
                      className='w-full justify-between'
                    >
                      {value
                        ? pendudukList?.find((item) => item === value)
                        : 'Silahkan pilih'}
                      <ArrowUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  {!value && (
                    <p className={'text-sm font-medium text-destructive'}>
                      Pilih penduduk terlebih dahulu
                    </p>
                  )}
                  <PopoverContent className='popover-content-width-full p-0'>
                    <Command>
                      <CommandInput placeholder='Cari...' className='h-9' />
                      <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {pendudukList?.map((item) => (
                            <CommandItem
                              key={item}
                              value={item}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? '' : currentValue
                                );
                                form.setValue(
                                  'nik',
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
                    Silahkan pilih penduduk
                  </p>
                </Popover>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <FormFieldInput<typeof aparatDesaSchema>
                  form={form}
                  name='nik'
                  label='NIK'
                  placeholder='3201234567890001'
                  maxLength={16}
                  description='Nomor Induk Kependudukan'
                  disabled={true}
                />
                <FormFieldInput<typeof aparatDesaSchema>
                  form={form}
                  name='nama'
                  label='Nama'
                  placeholder='Nama lengkap'
                  maxLength={255}
                  description='Nama Lengkap Penduduk'
                  disabled={true}
                />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <FormFieldSelect<typeof aparatDesaSchema>
                  form={form}
                  name='jabatan'
                  label='Jabatan'
                  placeholder='Pilih Jabatan'
                  values={JabatanEnum.options}
                />
                <FormFieldInput<typeof aparatDesaSchema>
                  form={form}
                  name='nip'
                  label='NIP'
                  placeholder='Nomor Induk Pegawai'
                  maxLength={18}
                  description='Nomor Induk Pegawai'
                  disabled={type === 'edit'}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
