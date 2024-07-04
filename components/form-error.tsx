import { CircleAlert } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className='w-full bg-destructive/15 border-2 p-2 rounded-sm flex items-center gap-x-2 text-destructive text-sm'>
      <CircleAlert className='w-4 h-4' />
      <p>{message}</p>
    </div>
  );
}
