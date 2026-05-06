'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PoolStatsBar } from '@/components/pool/PoolStatsBar';
import { LPPositionCard } from '@/components/pool/LPPositionCard';
import { DepositForm } from '@/components/pool/DepositForm';
import { WithdrawForm } from '@/components/pool/WithdrawForm';
import { UtilisationGauge } from '@/components/charts/UtilisationGauge';
import { useWallet } from '@/components/wallet/WalletProvider';
import { usePoolStats, useLPPosition } from '@/hooks/usePoolStats';
import { calculateUtilisation } from '@/lib/format';

export default function PoolDashboardPage(): React.ReactElement {
  const router = useRouter();
  const { isConnected } = useWallet();
  const { stats, isLoading: statsLoading, mutate: mutateStats } = usePoolStats();
  const { position, isLoading: positionLoading, mutate: mutatePosition } = useLPPosition();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleSuccess = async (): Promise<void> => {
    await mutateStats();
    await mutatePosition();
  };

  if (!isConnected) {
    return <div className="container py-12">Redirecting...</div>;
  }

  const utilisation = stats
    ? calculateUtilisation(stats.totalLocked, stats.totalCapital)
    : 0;

  return (
    <div className="container py-12 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Liquidity Pool</h1>
        <p className="text-muted-foreground mt-2">
          Provide liquidity and earn yield from policy premiums
        </p>
      </div>

      {/* Pool Stats */}
      <PoolStatsBar stats={stats} isLoading={statsLoading} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="deposit">
            <TabsList className="w-full">
              <TabsTrigger value="deposit" className="flex-1">
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="flex-1">
                Withdraw
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="mt-6">
              <DepositForm onSuccess={handleSuccess} />
            </TabsContent>

            <TabsContent value="withdraw" className="mt-6">
              <WithdrawForm onSuccess={handleSuccess} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <LPPositionCard position={position} isLoading={positionLoading} />
          <UtilisationGauge utilisation={utilisation} />
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">How It Works</h3>
          <p className="text-sm text-muted-foreground">
            Deposit USDC to receive LP shares representing your portion of the pool. Your capital
            is used to underwrite crop insurance policies. Earn yield from policy premiums.
          </p>
        </div>

        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">Risks</h3>
          <p className="text-sm text-muted-foreground">
            Your capital may be locked when policies are active. If policies trigger, payouts are
            made from the pool, reducing total capital. Diversification across many policies
            reduces risk.
          </p>
        </div>
      </div>
    </div>
  );
}
