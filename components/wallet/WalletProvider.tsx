'use client';

import * as React from 'react';
import { isConnected, getPublicKey } from '@stellar/freighter-api';

export interface WalletContextValue {
  address: string | null;
  isConnected: boolean;
  isCorrectNetwork: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
}

const WalletContext = React.createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [address, setAddress] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const checkConnection = React.useCallback(async () => {
    try {
      const connected = await isConnected();
      if (connected) {
        const publicKey = await getPublicKey();
        setAddress(publicKey);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.error('Failed to check wallet connection:', error);
      setAddress(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const connect = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const publicKey = await getPublicKey();
      setAddress(publicKey);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = React.useCallback(() => {
    setAddress(null);
  }, []);

  const value = React.useMemo(
    () => ({
      address,
      isConnected: !!address,
      isCorrectNetwork: true, // TODO: Implement network checking
      connect,
      disconnect,
      isLoading,
    }),
    [address, connect, disconnect, isLoading]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const context = React.useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
