'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCeresClient } from '@/hooks/useCeresClient';
import { useWallet } from '@/components/wallet/WalletProvider';
import { useToast } from '@/components/ui/toast-context';
import { parseRainfall, parseNDVI } from '@/lib/format';
import { signTransaction } from '@stellar/freighter-api';

const readingSchema = z.object({
  geohash: z.string().min(5, 'Geohash must be at least 5 characters'),
  readingType: z.enum(['rainfall', 'ndvi']),
  value: z.string().min(1, 'Value is required').refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    },
    { message: 'Value must be a positive number' }
  ),
});

type ReadingFormData = z.infer<typeof readingSchema>;

interface ReadingSubmitFormProps {
  onSuccess: () => void;
}

export function ReadingSubmitForm({ onSuccess }: ReadingSubmitFormProps): React.ReactElement {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { address } = useWallet();
  const client = useCeresClient();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReadingFormData>({
    resolver: zodResolver(readingSchema),
    defaultValues: {
      readingType: 'rainfall',
    },
  });

  const readingType = watch('readingType');

  const onSubmit = async (data: ReadingFormData): Promise<void> => {
    if (!address) {
      addToast('error', 'Please connect your wallet');
      return;
    }

    setIsSubmitting(true);
    try {
      const value =
        data.readingType === 'rainfall'
          ? parseRainfall(data.value)
          : parseNDVI(data.value);

      const tx = await client.submitReading({
        submitter: address,
        geohash: data.geohash,
        readingType: data.readingType,
        value,
        timestamp: Math.floor(Date.now() / 1000),
      });

      const signedXdr = await signTransaction(tx.toXDR(), {
        networkPassphrase: client.networkPassphrase,
      });

      await client.submitTransaction(signedXdr);

      addToast('success', 'Reading submitted successfully!');
      reset();
      onSuccess();
    } catch (error) {
      console.error('Submit reading error:', error);
      if (error instanceof Error && error.message.includes('User declined')) {
        addToast('error', 'Transaction rejected by user');
      } else {
        addToast('error', 'Failed to submit reading. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Oracle Reading</CardTitle>
        <CardDescription>Submit weather or vegetation data for a geo-cell</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="geohash">Geo-cell (Geohash)</Label>
            <Input
              id="geohash"
              placeholder="e.g., s00twy01x"
              {...register('geohash')}
            />
            {errors.geohash && (
              <p className="text-sm text-destructive mt-1">{errors.geohash.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="readingType">Reading Type</Label>
            <Select id="readingType" {...register('readingType')}>
              <option value="rainfall">Rainfall (mm)</option>
              <option value="ndvi">NDVI (0-1)</option>
            </Select>
            {errors.readingType && (
              <p className="text-sm text-destructive mt-1">{errors.readingType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="value">
              Value {readingType === 'rainfall' ? '(mm)' : '(0-1)'}
            </Label>
            <Input
              id="value"
              type="number"
              step={readingType === 'rainfall' ? '0.1' : '0.0001'}
              placeholder={readingType === 'rainfall' ? '412.5' : '0.6500'}
              {...register('value')}
            />
            {errors.value && (
              <p className="text-sm text-destructive mt-1">{errors.value.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Reading'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
