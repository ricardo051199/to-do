'use client';

import { useWalletKit } from '@mysten/wallet-kit';

export function WalletConnect() {
  const { 
    isConnected, 
    disconnect, 
    wallets, 
    connect, 
    currentWallet 
  } = useWalletKit();

  return (
    <div className="wallet-connect">
      {isConnected ? (
        <div className="connected-wallet">
          <span>Conectado con: {currentWallet?.name}</span>
          <button onClick={disconnect} className="disconnect-btn">
            Desconectar
          </button>
        </div>
      ) : (
        <div className="wallet-options">
          <span>Conecta tu wallet: </span>
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => connect(wallet.name)}
              className="wallet-btn"
            >
              {wallet.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}