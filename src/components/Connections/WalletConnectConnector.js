import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import WalletConnectProvider from '@walletconnect/web3-provider';

const infuraKey = "c3ce9016311c4a9e81eaaeeb98f96359";

export const walletConnect = new WalletConnectConnector({
   supportedChainIds: [1],
   infuraId: infuraKey,   
   rpc: {
      1: "https://mainnet.infura.io/v3/c3ce9016311c4a9e81eaaeeb98f96359"
   },
   qrcode: true,  
   chainId: 1
});

export const walletConnectProvider = new WalletConnectProvider({
    supportedChainIds: [1],
    infuraId: infuraKey,
    rpc: {
        1: "https://mainnet.infura.io/v3/c3ce9016311c4a9e81eaaeeb98f96359",
    },
    qrcode: true,
    chainId: 1,
});
//  (async () => {
//      await walletConnectProvider.enable();
//  })();
