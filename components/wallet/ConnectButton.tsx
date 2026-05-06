'use client';

import * as React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from './WalletProvider';
import { useToast } from '@/components/ui/toast-context';
import { truncateAddress } from '@/lib/format';
import { STELLAR_NETWORK } from '@/lib/constants';

export function ConnectButton(): React.ReactElement {
  const { address, isConnected, isCorrectNetwork, connect, disconnect, isLoading } = useWallet();
  const { addToast } = useToast();

  const handleConnect = async (): Promise<void> => {
    try {
      await connect();
      addToast('success', 'Wallet connected successfully');
    } catch (error) {
      console.error('Connection error:', error);
      addToast('error', 'Failed to connect wallet. Please install Freighter extension.');
    }
  };

  const handleDisconnect = (): void => {
    disconnect();
    addToast('info', 'Wallet disconnected');
  };

  if (isLoading) {
    return (
      <Button disabled variant="outline">
        <Wallet className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    );
  }

  if (isConnected && !isCorrectNetwork) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          Wrong network (use {STELLAR_NETWORK})
        </div>
        <Button onClick={handleDisconnect} variant="destructive" size="sm">
          Disconnect
        </Button>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">{truncateAddress(address)}</div>
        <Button onClick={handleDisconnect} variant="outline" size="sm">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnect} variant="default">
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
