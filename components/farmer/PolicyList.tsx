import { PolicyCard } from './PolicyCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Policy } from '@/hooks/usePolicies';

interface PolicyListProps {
  policies: Policy[] | undefined;
  isLoading: boolean;
}

export function PolicyList({ policies, isLoading }: PolicyListProps): React.ReactElement {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  if (!policies || policies.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No policies found. Register your first policy to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {policies.map((policy) => (
        <PolicyCard key={policy.id} policy={policy} />
      ))}
    </div>
  );
}
