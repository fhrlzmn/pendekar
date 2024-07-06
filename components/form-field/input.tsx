import { TypeOf, z } from 'zod';
import { Path, UseFormReturn } from 'react-hook-form';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';

interface FormFieldInputProps<ZodObject extends z.AnyZodObject> {
  form: UseFormReturn<z.infer<ZodObject>>;
  name: keyof z.infer<ZodObject>;
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  maxLength?: number | undefined;
  description?: string | undefined;
}

export default function FormFieldInput<const Schema extends z.AnyZodObject>({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  maxLength,
  description,
}: FormFieldInputProps<Schema>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<TypeOf<Schema>>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              maxLength={maxLength}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
