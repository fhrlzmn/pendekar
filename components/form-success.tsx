import { CircleCheck } from 'lucide-react';

interface FormSuccessProps {
  message?: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className='w-full bg-emerald-500/15 border-2 p-2 rounded-sm flex items-center gap-x-2 text-emerald-500 text-sm'>
      <CircleCheck className='w-4 h-4' />
      <p>{message}</p>
    </div>
  );
}
