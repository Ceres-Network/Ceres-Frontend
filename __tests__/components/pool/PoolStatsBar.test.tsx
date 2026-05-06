import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PoolStatsBar } from '@/components/pool/PoolStatsBar';
import type { PoolStats } from '@/hooks/usePoolStats';

describe('PoolStatsBar', () => {
  const mockStats: PoolStats = {
    totalCapital: BigInt(100000000000),
    totalLocked: BigInt(50000000000),
    freeCapital: BigInt(50000000000),
    utilisation: 50,
    totalShares: BigInt(100000000),
  };

  it('should render loading skeletons when loading', () => {
    const { container } = render(<PoolStatsBar stats={undefined} isLoading={true} />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should render pool stats correctly', () => {
    render(<PoolStatsBar stats={mockStats} isLoading={false} />);

    expect(screen.getByText('Total Capital')).toBeInTheDocument();
    expect(screen.getByText('Total Locked')).toBeInTheDocument();
    expect(screen.getByText('Free Capital')).toBeInTheDocument();
    expect(screen.getByText('Utilisation')).toBeInTheDocument();
  });

  it('should display correct utilisation percentage', () => {
    render(<PoolStatsBar stats={mockStats} isLoading={false} />);
    expect(screen.getByText('50.00%')).toBeInTheDocument();
  });
});
