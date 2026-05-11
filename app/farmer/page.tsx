'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWallet } from '@/components/wallet/WalletProvider';
import { Plus, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FarmerDashboardPage(): React.ReactElement {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Farmer Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your crop insurance policies</p>
        </div>
        <Button size="lg" disabled>
          <Plus className="mr-2 h-4 w-4" />
          Register New Policy
        </Button>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Policy Management</AlertTitle>
        <AlertDescription>
          Policy registration and management features are currently under development. 
          Connect your wallet to get started once available.
        </AlertDescription>
      </Alert>

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
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Shield className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
                <p className="text-2xl font-bold">$0.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Triggered Payouts</p>
                <p className="text-2xl font-bold">$0.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy List Placeholder */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Policies</h2>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No policies found</p>
            <p className="text-sm mt-2">Register your first policy to get started</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
