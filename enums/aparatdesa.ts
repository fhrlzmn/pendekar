import { z } from 'zod';

export const JabatanEnum = z.enum([
  'Kepala Desa',
  'Sekretaris Desa',
  'Kepala Seksi Pelayanan',
  'Kepala Seksi Pemerintahan',
  'Pelayanan',
]);
