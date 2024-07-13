import { Prisma } from '@prisma/client';

export type PermohonanSuratWithPenduduk = Prisma.PermohonanSuratGetPayload<{
  include: {
    penduduk: true;
  };
}>;
