import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PolicyStatusBadge } from './PolicyStatusBadge';
import { formatUSDC, formatTimestamp } from '@/lib/format';
import type { Policy } from '@/hooks/usePolicies';
import { MapPin } from 'lucide-react';

interface PolicyCardProps {
  policy: Policy;
}

export function PolicyCard({ policy }: PolicyCardProps): React.ReactElement {
  return (
    <Card className="hover:border-primary transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg capitalize">{policy.cropType}</CardTitle>
          <PolicyStatusBadge status={policy.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="font-mono">{policy.geohash}</span>
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Coverage</span>
            <span className="font-semibold">{formatUSDC(policy.coverageAmount)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
