'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RegisterPolicyForm } from '@/components/farmer/RegisterPolicyForm';
import { useWallet } from '@/components/wallet/WalletProvider';
import { ChevronLeft } from 'lucide-react';

export default function RegisterPolicyPage(): React.ReactElement {
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
    <div className="container py-12 max-w-3xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/farmer">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <RegisterPolicyForm />
    </div>
  );
}
