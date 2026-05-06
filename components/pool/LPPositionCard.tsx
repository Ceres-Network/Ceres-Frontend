import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatUSDC, formatShares } from '@/lib/format';
import type { LPPosition } from '@/hooks/usePoolStats';
import { Wallet } from 'lucide-react';

interface LPPositionCardProps {
  position: LPPosition | undefined;
  isLoading: boolean;
}

export function LPPositionCard({ position, isLoading }: LPPositionCardProps): React.ReactElement {
  if (isLoading) {
    return <Skeleton className="h-32" />;
  }

  if (!position || position.shares === BigInt(0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Position</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You don't have any LP shares yet. Deposit USDC to start earning yield.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Your Position
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">LP Shares</span>
          <span className="font-mono">{formatShares(position.shares)}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          <span className="text-muted-foreground">Current Value</span>
          <span className="text-xl font-bold text-primary">{formatUSDC(position.usdcValue)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
