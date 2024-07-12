import Link from 'next/link';
import { MailPlus } from 'lucide-react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface JenisSuratCardProps {
  path: string;
  title: string;
  description?: string;
}

export default function JenisSuratCard({
  path,
  title,
  description,
}: JenisSuratCardProps) {
  return (
    <Link href={path} className='group'>
      <Card className='group-hover:bg-primary flex flex-col justify-center items-center'>
        <CardHeader className='text-center'>
          <CardTitle className='group-hover:text-background'>{title}</CardTitle>
        </CardHeader>
        <CardContent className='group-hover:text-background'>
          <MailPlus className='h-16 w-16 opacity-60' />
        </CardContent>
        <CardFooter className='group-hover:text-background'>
          {description && <p>{description}</p>}
        </CardFooter>
      </Card>
    </Link>
  );
}
