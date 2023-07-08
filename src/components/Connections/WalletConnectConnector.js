import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import WalletConnectProvider from '@walletconnect/web3-provider';


export const walletConnect = new WalletConnectConnector({
    supportedChainIds: [ 1, 56 ],
    infuraId: "2a30f84fac220e83cd70e056029de89b",
    rpc: {
        56: "https://rpc.ankr.com/bsc"
    },
    qrcode: true,
    qrcodeModalOptions: {
        mobileLinks: [
            "trust",
        ]
    },
    chainId: 56,
    pollingInterval: 15000
});

export const walletConnectProvider = new WalletConnectProvider({
    supportedChainIds: [ 1, 56 ],
    infuraId: "2a30f84fac220e83cd70e056029de89b",
    rpc: {
        56: "https://rpc.ankr.com/bsc"
    },
    qrcode: true,
    qrcodeModalOptions: {
        mobileLinks: [
            "trust",
        ]
    },
    chainId: 56,
    pollingInterval: 15000
});
//  (async () => {
//      await walletConnectProvider.enable();
//  })();