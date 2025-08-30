'use client';

import { WalletKitProvider } from '@mysten/wallet-kit';
import { WalletConnect } from './components/WalletConnect';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <WalletKitProvider>
          <div className="app-container">
            <header className="app-header">
              <h1>Todo App - Sui Blockchain</h1>
              <WalletConnect />
            </header>
            <main className="app-main">
              {children}
            </main>
          </div>
        </WalletKitProvider>
      </body>
    </html>
  );
}