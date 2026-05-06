import { Badge } from '@/components/ui/badge';
import type { Policy } from '@/hooks/usePolicies';

interface PolicyStatusBadgeProps {
  status: Policy['status'];
}

export function PolicyStatusBadge({ status }: PolicyStatusBadgeProps): React.ReactElement {
  const variants = {
    active: { variant: 'default' as const, label: 'Active' },
    triggered: { variant: 'destructive' as const, label: 'Triggered' },
    expired: { variant: 'secondary' as const, label: 'Expired' },
  };

  const { variant, label } = variants[status];

  return <Badge variant={variant}>{label}</Badge>;
}
