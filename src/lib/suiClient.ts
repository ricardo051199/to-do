import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const CUSTOM_FULLNODE_URL = process.env.NEXT_PUBLIC_SUI_FULLNODE_URL;

export const NETWORKS = {
  testnet: {
    url: CUSTOM_FULLNODE_URL || getFullnodeUrl('testnet'),
    PACKAGE_ID: PACKAGE_ID,
  },
  mainnet: {
    url: getFullnodeUrl('mainnet'),
    PACKAGE_ID: '',
  },
  devnet: {
    url: getFullnodeUrl('devnet'),
    PACKAGE_ID: '',
  },
};

export const suiClient = new SuiClient({ url: NETWORKS.testnet.url });