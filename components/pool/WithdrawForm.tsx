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
import { useLPPosition } from '@/hooks/usePoolStats';
import { parseShares, formatUSDC, formatShares } from '@/lib/format';
import { signTransaction } from '@stellar/freighter-api';
import { ArrowDown } from 'lucide-react';

const withdrawSchema = z.object({
  shares: z.string().min(1, 'Amount is required').refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: 'Amount must be greater than 0' }
  ),
});

type WithdrawFormData = z.infer<typeof withdrawSchema>;

interface WithdrawFormProps {
  onSuccess: () => void;
}

export function WithdrawForm({ onSuccess }: WithdrawFormProps): React.ReactElement {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [previewUsdc, setPreviewUsdc] = React.useState<bigint | null>(null);

  const { address } = useWallet();
  const client = useCeresClient();
  const { addToast } = useToast();
  const { position } = useLPPosition();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
  });

  const shares = watch('shares');

  React.useEffect(() => {
    const fetchPreview = async (): Promise<void> => {
      if (!shares || parseFloat(shares) <= 0) {
        setPreviewUsdc(null);
        return;
      }

      try {
        const usdc = await client.previewWithdraw(parseShares(shares));
        setPreviewUsdc(usdc);
      } catch (error) {
        console.error('Failed to preview withdraw:', error);
        setPreviewUsdc(null);
      }
    };

    const timeoutId = setTimeout(fetchPreview, 300);
    return () => clearTimeout(timeoutId);
  }, [shares, client]);

  const onSubmit = async (data: WithdrawFormData): Promise<void> => {
    if (!address) {
      addToast('error', 'Please connect your wallet');
      return;
    }

    setIsSubmitting(true);
    try {
      const tx = await client.withdraw({
        withdrawer: address,
        shares: parseShares(data.shares),
      });

      const signedXdr = await signTransaction(tx.toXDR(), {
        networkPassphrase: client.networkPassphrase,
      });

      await client.submitTransaction(signedXdr);

      addToast('success', 'Withdrawal successful!');
      onSuccess();
    } catch (error) {
      console.error('Withdraw error:', error);
      if (error instanceof Error && error.message.includes('User declined')) {
        addToast('error', 'Transaction rejected by user');
      } else {
        addToast('error', 'Failed to withdraw. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMaxClick = (): void => {
    if (position) {
      setValue('shares', formatShares(position.shares));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw USDC</CardTitle>
        <CardDescription>Burn LP shares to withdraw your liquidity</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="shares">Shares</Label>
              {position && position.shares > BigInt(0) && (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={handleMaxClick}
                  className="h-auto p-0 text-xs"
                >
                  Max: {formatShares(position.shares)}
                </Button>
              )}
            </div>
            <Input
              id="shares"
              type="number"
              step="0.000001"
              placeholder="0.000000"
              {...register('shares')}
            />
            {errors.shares && (
              <p className="text-sm text-destructive mt-1">{errors.shares.message}</p>
            )}
          </div>

          {previewUsdc !== null && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-center">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">You will receive</p>
                <p className="text-xl font-bold">{formatUSDC(previewUsdc)}</p>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting || !previewUsdc}>
            {isSubmitting ? 'Processing...' : 'Withdraw'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
