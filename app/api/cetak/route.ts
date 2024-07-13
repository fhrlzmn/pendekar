import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFileSync } from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import { SuratWithRelations } from '@/types/surat';
import { Prisma } from '@prisma/client';
import { formatDate } from '@/lib/utils';

function generateDocx(surat: SuratWithRelations) {
  const templatePath = path.join(
    process.cwd(),
    'template-surat',
    `${surat.jenisSurat.kode.toLowerCase()}.docx`
  );
  const content = readFileSync(templatePath, 'binary');

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  const data = surat.data as Prisma.JsonObject;

  doc.render({
    jabatan: surat.aparatDesa.jabatan,
    nomorSurat: surat.nomorSurat,
    tanggalSurat: formatDate(new Date(surat.tanggalPengajuan)),
    penandatangan: surat.aparatDesa.jabatan,
    namaPenandatangan: surat.aparatDesa.nama,
    nip: surat.aparatDesa.nip,
    ...data,
  });

  const buffer = doc
    .getZip()
    .generate({ type: 'nodebuffer', compression: 'DEFLATE' });

  return buffer;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const query = await req.json();

  const buffer = generateDocx(query);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=${query.nomorSurat}.docx`,
    },
  });
}
