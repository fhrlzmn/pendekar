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
import { Textarea } from '@/components/ui/textarea';

interface FormFieldTextareaProps<ZodObject extends z.AnyZodObject> {
  form: UseFormReturn<z.infer<ZodObject>>;
  name: keyof z.infer<ZodObject>;
  label: string;
  placeholder?: string | undefined;
  maxLength?: number | undefined;
  description?: string | undefined;
  disabled?: boolean | undefined;
}

export default function FormFieldTextarea<const Schema extends z.AnyZodObject>({
  form,
  name,
  label,
  placeholder,
  maxLength,
  description,
  disabled = false,
}: FormFieldTextareaProps<Schema>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<TypeOf<Schema>>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              maxLength={maxLength}
              readOnly={disabled}
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
