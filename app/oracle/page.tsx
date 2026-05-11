'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/components/wallet/WalletProvider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CloudRain } from 'lucide-react';

export default function OracleDashboardPage(): React.ReactElement {
  const router = useRouter();
  const { isConnected } = useWallet();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return <div className="container py-12">Redirecting...</div>;
  }

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Oracle Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Submit weather and vegetation readings for geo-cells
        </p>
      </div>

      <Alert>
        <CloudRain className="h-4 w-4" />
        <AlertTitle>Oracle Node Information</AlertTitle>
        <AlertDescription>
          Oracle operators submit weather readings (rainfall) and vegetation health data (NDVI) for
          specific geographic cells. This functionality is currently under development.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit Reading</CardTitle>
            <CardDescription>Submit weather or vegetation data for a geo-cell</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-8">
              Reading submission coming soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Node Health</CardTitle>
            <CardDescription>Your oracle node statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-8">
              Node health tracking coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reading History</CardTitle>
          <CardDescription>Recent submissions from all oracle nodes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No readings available
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
