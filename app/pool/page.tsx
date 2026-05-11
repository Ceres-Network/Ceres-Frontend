'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PoolStatsBar } from '@/components/pool/PoolStatsBar';
import { useWallet } from '@/components/wallet/WalletProvider';
import { usePoolStats } from '@/hooks/usePoolStats';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Droplets } from 'lucide-react';

export default function PoolDashboardPage(): React.ReactElement {
  const router = useRouter();
  const { isConnected } = useWallet();
  const { stats, isLoading } = usePoolStats();

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
        <h1 className="text-4xl font-bold">Liquidity Pool</h1>
        <p className="text-muted-foreground mt-2">
          Provide liquidity and earn yield from insurance premiums
        </p>
      </div>

      <PoolStatsBar stats={stats} isLoading={isLoading} />

      <Alert>
        <Droplets className="h-4 w-4" />
        <AlertTitle>Liquidity Pool</AlertTitle>
        <AlertDescription>
          Deposit and withdrawal functionality is currently under development. 
          Pool statistics will be available once the smart contracts are deployed.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deposit USDC</CardTitle>
            <CardDescription>Add liquidity to the pool and receive LP shares</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-8">
              Deposit functionality coming soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdraw USDC</CardTitle>
            <CardDescription>Burn LP shares to withdraw your USDC</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-8">
              Withdrawal functionality coming soon
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
