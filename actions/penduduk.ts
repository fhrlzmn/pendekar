'use server';

import { pendudukSchema } from '@/schema/penduduk';
import { z } from 'zod';

export async function addPenduduk(values: z.infer<typeof pendudukSchema>) {
  const validatedFields = pendudukSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  return { success: 'Data berhasil disimpan' };
}
