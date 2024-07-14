import UserLoginForm from '@/components/auth/user-login-form';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='w-full min-h-screen lg:grid lg:grid-cols-2'>
      <div className='hidden lg:block relative bg-muted'>
        <Image
          src='/placeholder.webp'
          alt='Image'
          layout='fill'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
        <div className='absolute w-full h-screen bg-foreground/50 p-12 flex flex-col justify-between'>
          <div>
            <h1 className='text-white text-4xl font-semibold'>PENDEKAR</h1>
            <p className='text-white text-lg'>Pelayanan Desa Karyalaksana</p>
          </div>
          <div>
            <p className='text-white text-sm'>© 2024 Desa Karyalaksana.</p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <UserLoginForm />
        </div>
      </div>
    </div>
  );
}
