'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PolicyList } from '@/components/farmer/PolicyList';
import { useWallet } from '@/components/wallet/WalletProvider';
import { usePolicies } from '@/hooks/usePolicies';
import { formatUSDC } from '@/lib/format';
import { Plus, Shield, TrendingUp, DollarSign } from 'lucide-react';

export default function FarmerDashboardPage(): React.ReactElement {
  const router = useRouter();
  const { isConnected } = useWallet();
  const { policies, isLoading } = usePolicies();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return <div className="container py-12">Redirecting...</div>;
  }

  const activePolicies = policies?.filter((p) => p.status === 'active') || [];
  const totalCoverage = policies?.reduce(
    (sum, p) => sum + BigInt(p.coverageAmount),
    BigInt(0)
  ) || BigInt(0);
  const totalPayouts = policies
    ?.filter((p) => p.status === 'triggered')
    .reduce((sum, p) => sum + BigInt(p.payoutAmount || 0), BigInt(0)) || BigInt(0);

  return (
    <div className="container py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Farmer Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your crop insurance policies</p>
        </div>
        <Button asChild size="lg">
          <Link href="/farmer/register">
            <Plus className="mr-2 h-4 w-4" />
            Register New Policy
          </Link>
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-2xl font-bold">{activePolicies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
                <p className="text-2xl font-bold">{formatUSDC(totalCoverage)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Triggered Payouts</p>
                <p className="text-2xl font-bold">{formatUSDC(totalPayouts)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Policies</h2>
        <PolicyList policies={policies} isLoading={isLoading} />
      </div>
    </div>
  );
}
