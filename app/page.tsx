import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sprout, ArrowRight } from 'lucide-react';

export default function HomePage(): React.ReactElement {
  return (
    <div className="container py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">
          <Sprout className="h-4 w-4" />
          Powered by Stellar/Soroban
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Decentralised Parametric
          <br />
          <span className="text-primary">Crop Insurance</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Protect your harvest with automated, transparent insurance. No claims, no agents, just
          smart contracts and oracle data.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" asChild>
            <Link href="/farmer">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pool">Provide Liquidity</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-12 bg-primary/5 rounded-2xl">
        <h2 className="text-3xl font-bold">Ready to Protect Your Harvest?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect your Freighter wallet to get started
        </p>
        <Button size="lg" asChild>
          <Link href="/farmer">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
