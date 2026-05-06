'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTimestamp } from '@/lib/format';

interface RainfallDataPoint {
  timestamp: number;
  value: number;
}

interface RainfallChartProps {
  data: RainfallDataPoint[];
  threshold?: number;
  title?: string;
}

export function RainfallChart({
  data,
  threshold,
  title = 'Rainfall Over Time',
}: RainfallChartProps): React.ReactElement {
  const chartData = data.map((point) => ({
    date: formatTimestamp(point.timestamp, 'MMM d'),
    rainfall: point.value / 100, // Convert from fixed-point
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft' }}
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) => [`${value.toFixed(1)} mm`, 'Rainfall']}
            />
            {threshold && (
              <ReferenceLine
                y={threshold / 100}
                stroke="hsl(var(--destructive))"
                strokeDasharray="3 3"
                label={{
                  value: 'Threshold',
                  fill: 'hsl(var(--destructive))',
                  fontSize: 12,
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="rainfall"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
