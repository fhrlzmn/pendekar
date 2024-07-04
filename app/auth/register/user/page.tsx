import Link from 'next/link';
import { Info } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';

export default function Page() {
  return (
    <div className='mt-32 lg:mt-0 lg:min-h-screen flex justify-center items-center'>
      <Card className='w-full mx-auto max-w-sm justify-center'>
        <CardHeader className='justify-center items-center gap-y-2'>
          <Info className='h-32 w-32 text-primary/75' />
          <CardTitle className='text-xl'>Hubungi Administrator</CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
          <p>
            Silahkan hubungi administrator untuk mendapatkan akses ke aplikasi
            ini.
          </p>
        </CardContent>
        <CardFooter className='justify-center'>
          <Link
            href='/auth/login/user'
            className={buttonVariants({ variant: 'default' })}
          >
            Kembali
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
