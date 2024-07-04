import dynamicIconImports from 'lucide-react/dynamicIconImports';

export type NavLink = {
  id: number;
  path: string;
  label: string;
  icon: keyof typeof dynamicIconImports;
};
