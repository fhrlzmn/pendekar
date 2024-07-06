import { TypeOf, z } from 'zod';
import { Path, PathValue, UseFormReturn } from 'react-hook-form';
import { ArrowUpDown, Check } from 'lucide-react';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { CommandList } from 'cmdk';

interface FormFieldComboBoxProps<ZodObject extends z.AnyZodObject> {
  form: UseFormReturn<z.infer<ZodObject>>;
  name: keyof z.infer<ZodObject>;
  label: string;
  description?: string;
  values: string[];
}

export default function FormFieldComboBox<const Schema extends z.AnyZodObject>({
  form,
  name,
  label,
  description,
  values,
}: FormFieldComboBoxProps<Schema>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<TypeOf<Schema>>}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    'w-full justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value || 'Silahkan pilih'}
                  <ArrowUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0'>
              <Command>
                <CommandInput placeholder='Cari...' className='h-9' />
                <CommandList>
                  <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {values.map((value) => (
                      <CommandItem
                        value={value}
                        key={value}
                        onSelect={() => {
                          form.setValue(
                            name as Path<TypeOf<Schema>>,
                            value as PathValue<
                              TypeOf<Schema>,
                              Path<TypeOf<Schema>>
                            >
                          );
                        }}
                      >
                        {value}
                        <Check
                          className={cn(
                            'ml-auto h-4 w-4',
                            value === field.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
