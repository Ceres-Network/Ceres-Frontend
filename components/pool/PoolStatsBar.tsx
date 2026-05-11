import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatUSDC } from '@/lib/format';
import type { PoolStats } from '@/hooks/usePoolStats';
import { DollarSign, Lock, TrendingUp } from 'lucide-react';

interface PoolStatsBarProps {
  stats: PoolStats | undefined;
  isLoading: boolean;
}

export function PoolStatsBar({ stats, isLoading }: PoolStatsBarProps): React.ReactElement {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Capital</p>
              <p className="text-2xl font-bold">
                {stats ? formatUSDC(stats.totalCapital) : '$0.00'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Lock className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Locked Capital</p>
              <p className="text-2xl font-bold">
                {stats ? formatUSDC(stats.totalLocked) : '$0.00'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilisation</p>
              <p className="text-2xl font-bold">
                {stats ? `${stats.utilisation.toFixed(1)}%` : '0.0%'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
