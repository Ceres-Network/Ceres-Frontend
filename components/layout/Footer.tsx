import Link from 'next/link';
import { Github, FileText, ExternalLink } from 'lucide-react';

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Ceres Network</h3>
            <p className="text-sm text-muted-foreground">
              Decentralised parametric crop insurance on Stellar/Soroban
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/ceres-network"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://stellar.expert/explorer/testnet"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Stellar Explorer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Network</h3>
            <p className="text-sm text-muted-foreground">
              Currently on Stellar Testnet
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ceres Network. Open source under MIT License.
        </div>
      </div>
    </footer>
  );
}
