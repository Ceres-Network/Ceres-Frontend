import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Shield, Zap, Globe, ArrowRight } from 'lucide-react';

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

        {/* Stats Ticker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
          <div className="p-6 bg-card rounded-lg border">
            <div className="text-3xl font-bold text-primary">$2.4M</div>
            <div className="text-sm text-muted-foreground">Total Capital Locked</div>
          </div>
          <div className="p-6 bg-card rounded-lg border">
            <div className="text-3xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Active Policies</div>
          </div>
          <div className="p-6 bg-card rounded-lg border">
            <div className="text-3xl font-bold text-primary">8,500+</div>
            <div className="text-sm text-muted-foreground">Farmers Protected</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to protect your crops with parametric insurance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Select your farm location, crop type, and coverage amount
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <CardTitle>Premium Locked</CardTitle>
              <CardDescription>
                Pay a small premium (≈2% of coverage) locked in smart contract
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <CardTitle>Oracle Monitors</CardTitle>
              <CardDescription>
                Decentralised oracles track rainfall and vegetation health
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <CardTitle>Automatic Payout</CardTitle>
              <CardDescription>
                If conditions trigger, payout sent instantly to your wallet
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Ceres Network?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built on Stellar for speed, transparency, and accessibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-4" />
              <CardTitle>No Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Payouts trigger automatically based on oracle data. No paperwork, no disputes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-4" />
              <CardTitle>No Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Smart contracts handle everything. Lower costs, faster processing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Parametric</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Triggers based on measurable weather data, not subjective damage assessment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Sprout className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Stellar-Native</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fast, low-cost transactions on Stellar. Accessible to farmers worldwide.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 py-12 bg-primary/5 rounded-2xl">
        <h2 className="text-3xl font-bold">Ready to Protect Your Harvest?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect your Freighter wallet and register your first policy in minutes
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
