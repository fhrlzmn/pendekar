import JenisSuratCard from '@/components/jenis-surat-card';

export default function Page() {
  return (
    <div className='w-full min-h-full flex flex-col gap-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>
          Ajukan Permohonan Surat Baru
        </h1>
      </div>
      <div className='rounded-sm grid md:grid-cols-3 gap-4'>
        <div className='grid gap-4'>
          <JenisSuratCard
            path='/user/ajukan/sktm'
            title='Surat Keterangan Tidak Mampu'
            description='Ajukan Surat'
          />
          <JenisSuratCard
            path='/user/ajukan/skbn'
            title='Surat Keterangan Beda Nama'
            description='Ajukan Surat'
          />
        </div>
        <div className='grid gap-4'>
          <JenisSuratCard
            path='/user/ajukan/skklhr'
            title='Surat Keterangan Kelahiran'
            description='Ajukan Surat'
          />
          <JenisSuratCard
            path='/user/ajukan/skkmtn'
            title='Surat Keterangan Kematian'
            description='Ajukan Surat'
          />
        </div>
        <div className='grid gap-4'>
          <JenisSuratCard
            path='/user/ajukan/sku'
            title='Surat Keterangan Usaha'
            description='Ajukan Surat'
          />
          <JenisSuratCard
            path='/user/ajukan/sik'
            title='Surat Izin Keramaian'
            description='Ajukan Surat'
          />
        </div>
      </div>
    </div>
  );
}
