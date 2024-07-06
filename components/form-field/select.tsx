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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface FormFieldSelect<ZodObject extends z.AnyZodObject> {
  form: UseFormReturn<z.infer<ZodObject>>;
  name: keyof z.infer<ZodObject>;
  label: string;
  placeholder?: string | undefined;
  description?: string | undefined;
  values: string[];
}

export default function FormFieldSelect<const Schema extends z.AnyZodObject>({
  form,
  name,
  label,
  placeholder,
  description,
  values,
}: FormFieldSelect<Schema>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<TypeOf<Schema>>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
