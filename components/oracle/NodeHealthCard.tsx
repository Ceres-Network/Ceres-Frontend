import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, MapPin, TrendingUp } from 'lucide-react';

interface NodeHealthCardProps {
  health:
    | {
        submissionsLast24h: number;
        trackedCells: string[];
        medianValues: Record<string, number>;
      }
    | undefined;
  isLoading: boolean;
}

export function NodeHealthCard({ health, isLoading }: NodeHealthCardProps): React.ReactElement {
  if (isLoading) {
    return <Skeleton className="h-48" />;
  }

  if (!health) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Node Health</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No node activity detected for your address
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Node Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Submissions (24h)</p>
            <p className="text-2xl font-bold">{health.submissionsLast24h}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/20 rounded-lg">
            <MapPin className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tracked Cells</p>
            <p className="text-2xl font-bold">{health.trackedCells.length}</p>
          </div>
        </div>

        {Object.keys(health.medianValues).length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Median Values</p>
            </div>
            <div className="space-y-2">
              {Object.entries(health.medianValues).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{key}</span>
                  <span className="font-mono">{value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
