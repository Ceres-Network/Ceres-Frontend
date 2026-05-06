'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { PolicyStatusBadge } from '@/components/farmer/PolicyStatusBadge';
import { RainfallChart } from '@/components/charts/RainfallChart';
import { useWallet } from '@/components/wallet/WalletProvider';
import { usePolicy } from '@/hooks/usePolicies';
import { useAggregatedReadings } from '@/hooks/useOracleReadings';
import { useCeresClient } from '@/hooks/useCeresClient';
import { useToast } from '@/components/ui/toast-context';
import { formatUSDC, formatTimestamp, formatRainfall, formatNDVI } from '@/lib/format';
import { signTransaction } from '@stellar/freighter-api';
import { ChevronLeft, MapPin, Calendar, Sprout, AlertCircle, ExternalLink } from 'lucide-react';

export default function PolicyDetailPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const policyId = params.id as string;

  const { isConnected, address } = useWallet();
  const { policy, isLoading, mutate } = usePolicy(policyId);
  const { readings } = useAggregatedReadings(policy?.geohash || null);
  const client = useCeresClient();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleEvaluate = async (): Promise<void> => {
    if (!address || !policy) return;

    try {
      const tx = await client.evaluatePolicy({
        policyId: policy.id,
        caller: address,
      });

      const signedXdr = await signTransaction(tx.toXDR(), {
        networkPassphrase: client.networkPassphrase,
      });

      const result = await client.submitTransaction(signedXdr);

      addToast('success', 'Policy evaluated successfully!');
      await mutate();
    } catch (error) {
      console.error('Evaluate error:', error);
      addToast('error', 'Failed to evaluate policy. Please try again.');
    }
  };

  if (!isConnected) {
    return <div className="container py-12">Redirecting...</div>;
  }

  if (isLoading) {
    return (
      <div className="container py-12 max-w-4xl space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="container py-12 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Policy Not Found</AlertTitle>
          <AlertDescription>
            The policy you're looking for doesn't exist or you don't have access to it.
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <Link href="/farmer">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const rainfallStatus = readings
    ? readings.rainfall < policy.rainfallThreshold
      ? 'red'
      : readings.rainfall < policy.rainfallThreshold * 1.2
      ? 'amber'
      : 'green'
    : 'gray';

  const ndviStatus = readings
    ? readings.ndvi < policy.ndviBaseline * 0.8
      ? 'red'
      : readings.ndvi < policy.ndviBaseline * 0.9
      ? 'amber'
      : 'green'
    : 'gray';

  return (
    <div className="container py-12 max-w-4xl space-y-6">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/farmer">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl capitalize">{policy.cropType} Policy</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">Policy ID: {policy.id}</p>
            </div>
            <PolicyStatusBadge status={policy.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-mono">{policy.geohash}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Season</p>
                  <p>
                    {formatTimestamp(policy.seasonStart)} - {formatTimestamp(policy.seasonEnd)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sprout className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Crop Type</p>
                  <p className="capitalize">{policy.cropType}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Coverage Amount</p>
                <p className="text-2xl font-bold">{formatUSDC(policy.coverageAmount)}</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Premium Paid</p>
                <p className="text-xl font-semibold">{formatUSDC(policy.premium)}</p>
              </div>

              {policy.status === 'triggered' && policy.payoutAmount && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary">
                  <p className="text-sm text-primary mb-1">Payout Received</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatUSDC(policy.payoutAmount)}
                  </p>
                  {policy.payoutTimestamp && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimestamp(policy.payoutTimestamp)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-4">Trigger Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Rainfall Threshold</p>
                <p className="text-lg font-semibold">{formatRainfall(policy.rainfallThreshold)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">NDVI Baseline</p>
                <p className="text-lg font-semibold">{formatNDVI(policy.ndviBaseline)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {readings && (
        <Card>
          <CardHeader>
            <CardTitle>Current Oracle Readings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg border-2 ${
                  rainfallStatus === 'green'
                    ? 'bg-primary/10 border-primary'
                    : rainfallStatus === 'amber'
                    ? 'bg-yellow-500/10 border-yellow-500'
                    : 'bg-destructive/10 border-destructive'
                }`}
              >
                <p className="text-sm text-muted-foreground mb-1">Current Rainfall</p>
                <p className="text-2xl font-bold">{formatRainfall(readings.rainfall)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Threshold: {formatRainfall(policy.rainfallThreshold)}
                </p>
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${
                  ndviStatus === 'green'
                    ? 'bg-primary/10 border-primary'
                    : ndviStatus === 'amber'
                    ? 'bg-yellow-500/10 border-yellow-500'
                    : 'bg-destructive/10 border-destructive'
                }`}
              >
                <p className="text-sm text-muted-foreground mb-1">Current NDVI</p>
                <p className="text-2xl font-bold">{formatNDVI(readings.ndvi)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Baseline: {formatNDVI(policy.ndviBaseline)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {policy.status === 'active' && (
        <div className="flex gap-4">
          <Button onClick={handleEvaluate} size="lg">
            Evaluate Policy
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href={`https://stellar.expert/explorer/testnet/contract/${policy.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Explorer
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
