import { Prisma } from '@prisma/client';

export type SuratWithRelations = Prisma.SuratGetPayload<{
  include: {
    penduduk: true;
    aparatDesa: true;
    jenisSurat: true;
  };
}>;
