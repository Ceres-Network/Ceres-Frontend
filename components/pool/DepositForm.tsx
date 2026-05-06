'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCeresClient } from '@/hooks/useCeresClient';
import { useWallet } from '@/components/wallet/WalletProvider';
import { useToast } from '@/components/ui/toast-context';
import { parseUSDC, formatShares } from '@/lib/format';
import { signTransaction } from '@stellar/freighter-api';
import { ArrowDown } from 'lucide-react';

const depositSchema = z.object({
  amount: z.string().min(1, 'Amount is required').refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: 'Amount must be greater than 0' }
  ),
});

type DepositFormData = z.infer<typeof depositSchema>;

interface DepositFormProps {
  onSuccess: () => void;
}

export function DepositForm({ onSuccess }: DepositFormProps): React.ReactElement {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [previewShares, setPreviewShares] = React.useState<bigint | null>(null);

  const { address } = useWallet();
  const client = useCeresClient();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
  });

  const amount = watch('amount');

  React.useEffect(() => {
    const fetchPreview = async (): Promise<void> => {
      if (!amount || parseFloat(amount) <= 0) {
        setPreviewShares(null);
        return;
      }

      try {
        const shares = await client.previewDeposit(parseUSDC(amount));
        setPreviewShares(shares);
      } catch (error) {
        console.error('Failed to preview deposit:', error);
        setPreviewShares(null);
      }
    };

    const timeoutId = setTimeout(fetchPreview, 300);
    return () => clearTimeout(timeoutId);
  }, [amount, client]);

  const onSubmit = async (data: DepositFormData): Promise<void> => {
    if (!address) {
      addToast('error', 'Please connect your wallet');
      return;
    }

    setIsSubmitting(true);
    try {
      const tx = await client.deposit({
        depositor: address,
        amount: parseUSDC(data.amount),
      });

      const signedXdr = await signTransaction(tx.toXDR(), {
        networkPassphrase: client.networkPassphrase,
      });

      await client.submitTransaction(signedXdr);

      addToast('success', 'Deposit successful!');
      onSuccess();
    } catch (error) {
      console.error('Deposit error:', error);
      if (error instanceof Error && error.message.includes('User declined')) {
        addToast('error', 'Transaction rejected by user');
      } else {
        addToast('error', 'Failed to deposit. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit USDC</CardTitle>
        <CardDescription>Add liquidity to the pool and receive LP shares</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (USDC)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('amount')}
            />
            {errors.amount && (
              <p className="text-sm text-destructive mt-1">{errors.amount.message}</p>
            )}
          </div>

          {previewShares !== null && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-center">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">You will receive</p>
                <p className="text-xl font-bold">{formatShares(previewShares)} shares</p>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting || !previewShares}>
            {isSubmitting ? 'Processing...' : 'Deposit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
