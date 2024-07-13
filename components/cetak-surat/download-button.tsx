'use client';

import { SuratWithRelations } from '@/types/surat';
import { Button } from '@/components/ui/button';
import { Printer, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function DownloadButton({
  surat,
}: {
  surat: SuratWithRelations;
}) {
  const [isPending, setIsPending] = useState(false);

  async function postData() {
    try {
      setIsPending(true);
      const response = await fetch('/api/cetak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surat),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${surat?.nomorSurat}.docx`;

      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsPending(false);
    } catch (error) {
      alert('Gagal mengunduh file');
    }
  }

  return (
    <Button onClick={postData} disabled={isPending}>
      {isPending ? (
        <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Printer className='h-4 w-4 mr-2' />
      )}
      Cetak
    </Button>
  );
}
