'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ReadingSubmitForm } from '@/components/oracle/ReadingSubmitForm';
import { ReadingHistoryTable } from '@/components/oracle/ReadingHistoryTable';
import { NodeHealthCard } from '@/components/oracle/NodeHealthCard';
import { useWallet } from '@/components/wallet/WalletProvider';
import { useOracleReadings, useNodeHealth } from '@/hooks/useOracleReadings';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function OracleDashboardPage(): React.ReactElement {
  const router = useRouter();
  const { isConnected, address } = useWallet();
  const { readings, isLoading, mutate } = useOracleReadings(20);
  const { health, isLoading: healthLoading } = useNodeHealth(address);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleSuccess = async (): Promise<void> => {
    await mutate();
  };

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
        <Info className="h-4 w-4" />
        <AlertTitle>Oracle Node Information</AlertTitle>
        <AlertDescription>
          Oracle operators submit weather readings (rainfall) and vegetation health data (NDVI) for
          specific geographic cells. Readings must be recent and accurate to be accepted by the
          protocol.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReadingSubmitForm onSuccess={handleSuccess} />
        </div>

        <div>
          <NodeHealthCard health={health} isLoading={healthLoading} />
        </div>
      </div>

      <ReadingHistoryTable readings={readings} isLoading={isLoading} />
    </div>
  );
}
