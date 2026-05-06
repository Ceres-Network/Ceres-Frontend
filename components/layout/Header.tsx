'use client';

import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { ConnectButton } from '@/components/wallet/ConnectButton';
import { useWallet } from '@/components/wallet/WalletProvider';

export function Header(): React.ReactElement {
  const { isConnected } = useWallet();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Sprout className="h-6 w-6 text-primary" />
            Ceres Network
          </Link>

          {isConnected && (
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link
                href="/farmer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Farmer
              </Link>
              <Link
                href="/pool"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pool
              </Link>
              <Link
                href="/oracle"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Oracle
              </Link>
            </nav>
          )}
        </div>

        <ConnectButton />
      </div>
    </header>
  );
}
