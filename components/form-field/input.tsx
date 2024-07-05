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

interface FormFieldInputProps<ZodObject extends z.AnyZodObject> {
  form: UseFormReturn<z.infer<ZodObject>>;
  name: keyof z.infer<ZodObject>;
  label: string;
  type: string;
  placeholder?: string;
  maxLength?: number;
  description?: string;
}

export default function FormFieldInput<const Schema extends z.AnyZodObject>({
  form,
  name,
  label,
  type,
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
