'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GeohashPicker } from './GeohashPicker';
import { useCeresClient } from '@/hooks/useCeresClient';
import { useWallet } from '@/components/wallet/WalletProvider';
import { useToast } from '@/components/ui/toast-context';
import { CROP_TYPES, COVERAGE_LIMITS, PREMIUM_RATE } from '@/lib/constants';
import { formatUSDC, parseUSDC, parseRainfall, parseNDVI } from '@/lib/format';
import { signTransaction } from '@stellar/freighter-api';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const policySchema = z.object({
  geohash: z.string().min(5, 'Please select a location on the map'),
  cropType: z.string().min(1, 'Please select a crop type'),
  seasonStart: z.string().min(1, 'Season start date is required'),
  seasonEnd: z.string().min(1, 'Season end date is required'),
  coverageAmount: z.number().min(COVERAGE_LIMITS.min).max(COVERAGE_LIMITS.max),
  rainfallThreshold: z.number().min(0).max(2000),
  ndviBaseline: z.number().min(0).max(1),
});

type PolicyFormData = z.infer<typeof policySchema>;

const STEPS = ['Location', 'Crop & Season', 'Coverage', 'Review & Pay'];

export function RegisterPolicyForm(): React.ReactElement {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [txHash, setTxHash] = React.useState<string | null>(null);

  const { address } = useWallet();
  const client = useCeresClient();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PolicyFormData>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      geohash: '',
      cropType: '',
      seasonStart: '',
      seasonEnd: '',
      coverageAmount: 500,
      rainfallThreshold: 400,
      ndviBaseline: 0.65,
    },
  });

  const formData = watch();
  const estimatedPremium = formData.coverageAmount * PREMIUM_RATE;

  const onSubmit = async (data: PolicyFormData): Promise<void> => {
    if (!address) {
      addToast('error', 'Please connect your wallet');
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert dates to Unix timestamps
      const seasonStart = Math.floor(new Date(data.seasonStart).getTime() / 1000);
      const seasonEnd = Math.floor(new Date(data.seasonEnd).getTime() / 1000);

      // Build transaction
      const tx = await client.registerPolicy({
        farmer: address,
        geohash: data.geohash,
        cropType: data.cropType,
        seasonStart,
        seasonEnd,
        coverageAmount: parseUSDC(data.coverageAmount.toString()),
        rainfallThreshold: parseRainfall(data.rainfallThreshold.toString()),
        ndviBaseline: parseNDVI(data.ndviBaseline.toString()),
      });

      // Sign with Freighter
      const signedXdr = await signTransaction(tx.toXDR(), {
        networkPassphrase: client.networkPassphrase,
      });

      // Submit transaction
      const result = await client.submitTransaction(signedXdr);

      setTxHash(result.hash);
      addToast('success', 'Policy registered successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error && error.message.includes('User declined')) {
        addToast('error', 'Transaction rejected by user');
      } else {
        addToast('error', 'Failed to register policy. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = (): void => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (txHash) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-primary/20 p-3">
              <Check className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center">Policy Registered Successfully!</CardTitle>
          <CardDescription className="text-center">
            Your policy has been created and is now active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Transaction Hash</div>
            <div className="font-mono text-xs break-all">{txHash}</div>
          </div>
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Explorer
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a href="/farmer">View My Policies</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Register New Policy</CardTitle>
          <CardDescription>Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}</CardDescription>
          <div className="flex gap-2 mt-4">
            {STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label>Farm Location</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Click on the map to select your farm plot center
                </p>
                <GeohashPicker
                  value={formData.geohash}
                  onChange={(geohash) => setValue('geohash', geohash)}
                />
                {errors.geohash && (
                  <p className="text-sm text-destructive mt-2">{errors.geohash.message}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cropType">Crop Type</Label>
                <Select id="cropType" {...register('cropType')}>
                  <option value="">Select crop type</option>
                  {CROP_TYPES.map((crop) => (
                    <option key={crop.value} value={crop.value}>
                      {crop.label}
                    </option>
                  ))}
                </Select>
                {errors.cropType && (
                  <p className="text-sm text-destructive mt-1">{errors.cropType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="seasonStart">Season Start Date</Label>
                <Input id="seasonStart" type="date" {...register('seasonStart')} />
                {errors.seasonStart && (
                  <p className="text-sm text-destructive mt-1">{errors.seasonStart.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="seasonEnd">Season End Date</Label>
                <Input id="seasonEnd" type="date" {...register('seasonEnd')} />
                {errors.seasonEnd && (
                  <p className="text-sm text-destructive mt-1">{errors.seasonEnd.message}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Coverage Amount: {formatUSDC(formData.coverageAmount * 1e7)}</Label>
                <Slider
                  min={COVERAGE_LIMITS.min}
                  max={COVERAGE_LIMITS.max}
                  step={50}
                  value={formData.coverageAmount}
                  onValueChange={(value) => setValue('coverageAmount', value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ${COVERAGE_LIMITS.min} - ${COVERAGE_LIMITS.max}
                </p>
              </div>

              <div>
                <Label>Rainfall Threshold: {formData.rainfallThreshold} mm</Label>
                <Slider
                  min={100}
                  max={1000}
                  step={10}
                  value={formData.rainfallThreshold}
                  onValueChange={(value) => setValue('rainfallThreshold', value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Policy triggers if rainfall falls below this threshold
                </p>
              </div>

              <div>
                <Label>NDVI Baseline: {formData.ndviBaseline.toFixed(2)}</Label>
                <Slider
                  min={0.3}
                  max={0.9}
                  step={0.01}
                  value={formData.ndviBaseline}
                  onValueChange={(value) => setValue('ndviBaseline', value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Normalized Difference Vegetation Index — measures crop health
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-mono">{formData.geohash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crop</span>
                  <span className="capitalize">{formData.cropType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Season</span>
                  <span>
                    {formData.seasonStart} to {formData.seasonEnd}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage</span>
                  <span className="font-semibold">{formatUSDC(formData.coverageAmount * 1e7)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rainfall Threshold</span>
                  <span>{formData.rainfallThreshold} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NDVI Baseline</span>
                  <span>{formData.ndviBaseline.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between text-lg">
                  <span className="font-semibold">Premium</span>
                  <span className="font-semibold text-primary">
                    {formatUSDC(estimatedPremium * 1e7)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                By registering this policy, you agree to lock the premium amount. The policy will
                automatically evaluate at season end.
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Register & Pay'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
