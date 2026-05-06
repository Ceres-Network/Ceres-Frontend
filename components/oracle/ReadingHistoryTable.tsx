import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatRainfall, formatNDVI, formatRelativeTime, truncateAddress } from '@/lib/format';
import type { OracleReading } from '@/hooks/useOracleReadings';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface ReadingHistoryTableProps {
  readings: OracleReading[] | undefined;
  isLoading: boolean;
}

export function ReadingHistoryTable({
  readings,
  isLoading,
}: ReadingHistoryTableProps): React.ReactElement {
  if (isLoading) {
    return <Skeleton className="h-96" />;
  }

  if (!readings || readings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reading History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No readings submitted yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Geo-cell
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Value
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Submitter
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Age
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {readings.map((reading) => (
                <tr key={reading.id} className="border-b last:border-0">
                  <td className="py-3 px-2 font-mono text-sm">{reading.geohash}</td>
                  <td className="py-3 px-2 text-sm capitalize">{reading.readingType}</td>
                  <td className="py-3 px-2 text-sm font-medium">
                    {reading.readingType === 'rainfall'
                      ? formatRainfall(reading.value)
                      : formatNDVI(reading.value)}
                  </td>
                  <td className="py-3 px-2 font-mono text-sm">
                    {truncateAddress(reading.submitter)}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {formatRelativeTime(reading.timestamp)}
                  </td>
                  <td className="py-3 px-2">
                    <StatusBadge status={reading.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: OracleReading['status'] }): React.ReactElement {
  const config = {
    accepted: {
      icon: CheckCircle,
      variant: 'default' as const,
      label: 'Accepted',
    },
    rejected: {
      icon: XCircle,
      variant: 'destructive' as const,
      label: 'Rejected',
    },
    too_old: {
      icon: Clock,
      variant: 'secondary' as const,
      label: 'Too Old',
    },
  };

  const { icon: Icon, variant, label } = config[status];

  return (
    <Badge variant={variant} className="flex items-center gap-1 w-fit">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}
