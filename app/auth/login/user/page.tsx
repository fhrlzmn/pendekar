import UserLoginForm from '@/components/auth/user-login-form';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='w-full min-h-screen lg:grid lg:grid-cols-2'>
      <div className='hidden bg-muted lg:block'>
        <Image
          src='/placeholder.webp'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <UserLoginForm />
        </div>
      </div>
    </div>
  );
}
