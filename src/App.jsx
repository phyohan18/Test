import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

// const CoinbaseWallet = new WalletLinkConnector({
//  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//  appName: "Web3-react Demo",
//  supportedChainIds: [1, 3, 4, 5, 42],
// });

// const WalletConnect = new WalletConnectConnector({
//  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//  bridge: "https://bridge.walletconnect.org",
//  qrcode: true,
// });

const Injected = new InjectedConnector({
 supportedChainIds: [1, 3, 4, 5, 42]
});

function App() {
  const { activate, active, chainId, account } = useWeb3React();
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => { activate(CoinbaseWallet) }}>Coinbase Wallet</button>
          <button onClick={() => { activate(WalletConnect) }}>Wallet Connect</button>
          <button onClick={() => { activate(Injected) }}>Metamask</button>
          <button onClick={() => {disconnect}}>Disconnect</button>
        </p>
        <p>
        Connection Status: {active}
        Account: {account}
        Network ID: {chainId}
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
