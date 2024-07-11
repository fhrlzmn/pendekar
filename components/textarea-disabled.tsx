import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextareaDisabledProps {
  label: string;
  value: string;
  description?: string;
}

export default function TextareaDisabled({
  label,
  value,
  description,
}: TextareaDisabledProps) {
  return (
    <div className='space-y-2'>
      <Label>{label}</Label>
      <Textarea
        value={value}
        className='text-foreground placeholder:text-foreground disabled:opacity-100 disabled:cursor-text'
        disabled
      />
      {description && <p>{description}</p>}
    </div>
  );
}
