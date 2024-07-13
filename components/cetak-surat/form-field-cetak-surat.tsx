'use client';

import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { cetakSuratSchema } from '@/schema/cetakSurat';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import FormFieldInput from '@/components/form-field/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';

interface FormFieldProps {
  form: UseFormReturn<z.infer<typeof cetakSuratSchema>>;
  aparatDesaSelect: { value: number; label: string }[];
}

export default function FormFieldCetakSurat({
  form,
  aparatDesaSelect,
}: FormFieldProps) {
  return (
    <>
      <FormField
        control={form.control}
        name='idPenandatangan'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ditandatangani oleh</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Pilih' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {aparatDesaSelect.map((aparat) => (
                  <SelectItem
                    key={aparat.value}
                    value={aparat.value.toString()}
                  >
                    {aparat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Surat ditandatangani oleh</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormFieldInput<typeof cetakSuratSchema>
        form={form}
        name='nomorSurat'
        label='Nomor Surat'
        placeholder='Nomor Surat'
        maxLength={32}
        description='Nomor surat yang akan digunakan'
      />
    </>
  );
}
