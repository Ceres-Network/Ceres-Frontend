'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UtilisationGaugeProps {
  utilisation: number;
  title?: string;
}

export function UtilisationGauge({
  utilisation,
  title = 'Pool Utilisation',
}: UtilisationGaugeProps): React.ReactElement {
  const data = [
    { name: 'Used', value: utilisation },
    { name: 'Available', value: 100 - utilisation },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold">{utilisation.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Utilised</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
