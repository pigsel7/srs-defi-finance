import { InjectedConnector } from '@web3-react/injected-connector';

export const injectedMetaMask = new InjectedConnector({
supportedChainIds: [1],
rpcUrls: {
1: "https://mainnet.infura.io/v3/c3ce9016311c4a9e81eaaeeb98f96359"
},
name: 'Metamask',
type: 'metamask',
});
//  export const injectedMetaMask = new InjectedConnector({
//      supportedChainIds: [ 1, 97 ],
//       rpcUrls: {
//          97: "https://data-seed-prebsc-1-s1.binance.org:8545"
//       },
//  });