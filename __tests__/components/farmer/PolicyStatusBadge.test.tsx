import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PolicyStatusBadge } from '@/components/farmer/PolicyStatusBadge';

describe('PolicyStatusBadge', () => {
  it('should render active status', () => {
    render(<PolicyStatusBadge status="active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should render triggered status', () => {
    render(<PolicyStatusBadge status="triggered" />);
    expect(screen.getByText('Triggered')).toBeInTheDocument();
  });

  it('should render expired status', () => {
    render(<PolicyStatusBadge status="expired" />);
    expect(screen.getByText('Expired')).toBeInTheDocument();
  });
});
