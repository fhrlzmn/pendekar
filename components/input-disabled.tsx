import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputDisabledProps {
  label: string;
  value: string;
  description?: string;
}

export default function InputDisabled({
  label,
  value,
  description,
}: InputDisabledProps) {
  return (
    <div className='space-y-2'>
      <Label>{label}</Label>
      <Input
        type='text'
        value={value}
        className='text-foreground placeholder:text-foreground disabled:opacity-100 disabled:cursor-text'
        disabled
      />
      {description && <p>{description}</p>}
    </div>
  );
}
