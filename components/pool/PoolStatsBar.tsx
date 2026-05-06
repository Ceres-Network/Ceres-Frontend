import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatUSDC, formatPercentage, calculateUtilisation } from '@/lib/format';
import type { PoolStats } from '@/hooks/usePoolStats';
import { TrendingUp, Lock, Unlock, Activity } from 'lucide-react';

interface PoolStatsBarProps {
  stats: PoolStats | undefined;
  isLoading: boolean;
}

export function PoolStatsBar({ stats, isLoading }: PoolStatsBarProps): React.ReactElement {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  const utilisation = calculateUtilisation(stats.totalLocked, stats.totalCapital);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Capital</p>
              <p className="text-2xl font-bold">{formatUSDC(stats.totalCapital)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/20 rounded-lg">
              <Lock className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Locked</p>
              <p className="text-2xl font-bold">{formatUSDC(stats.totalLocked)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Unlock className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Free Capital</p>
              <p className="text-2xl font-bold">{formatUSDC(stats.freeCapital)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Activity className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilisation</p>
              <p className="text-2xl font-bold">{formatPercentage(utilisation)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
