import WalletLink from '@coinbase/wallet-sdk';
import  { providers } from 'web3modal';
export const providerOptions = {
    'custom-walletlink': {
        display: {
            logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
            name: 'Coinbase',
            description: 'Connect to Coinbase Wallet (not Coinbase App)',
        },
        options: {
            appName: 'Coinbase', // Your app name
            networkUrl: process.env.INFURA,
            chainId: 4,
        },
        package: WalletLink,
        connector: async (_, options) => {
            const { appName, networkUrl, chainId } = options;
            const walletLink = new WalletLink({
                appName,
        })
        const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
        await provider.enable()
            return provider;
        },
    },
    'custom-metamask': {
        display: {
            logo: providers.METAMASK.logo, name: 'Install MetaMask',description: 'Connect using browser wallet'
          },
          package: {},
          connector: async () => {
            window.open('https://metamask.io')
            throw new Error('MetaMask not installed');
          }
    }
}