import logo from './logo.svg'
import './App.css'
import MetaMaskOnboarding from '@metamask/onboarding'
import { useRef,useState } from 'react'

//We create a new MetaMask onboarding object to use in our app
const onboarding = new MetaMaskOnboarding()
onboarding.stopOnboarding()

const isMetaMaskInstalled = () =>{
  const { ethereum } = window
  console.log(ethereum)
  return ethereum && ethereum.isMetaMask
}


const onClickInstall = () =>{
  onboarding.startOnboarding()
}

async function isMetaMaskConnected() {
  const {ethereum} = window;
  const accounts = await ethereum.request({method: 'eth_accounts'});
  return accounts;
}

console.log(isMetaMaskConnected())


function App() {
  
  const button = useRef()
  const [stats,setStats] = useState({
    account_id : 0,
    account_balance : 0
  })

  const MetaMaskClientCheck = () => {
    button.current.disabled = true;
    isMetaMaskInstalled() ?  onClickConnect(): onClickInstall() 
  }

  const onClickConnect = async () => {
    // Will open the MetaMask UI
    // Get the account
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    ethereum
    .request({
      method: 'eth_getBalance',
      params: [accounts[0],'latest'],
    })
    .then( decryptedMessage => {
        const wei = parseInt(decryptedMessage,16);
        const balance = wei /(10**18)
        setStats({account: accounts[0],account_balance:balance})
      }
    )
    button.current.innerHTML = accounts[0] || "Not able to get accounts"
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button ref={button} onClick={MetaMaskClientCheck}>
            {isMetaMaskInstalled() ? "Connect" : "Click To Install"}
          </button>
          <button >Disconnect</button>
        </p>
        <p>
        Connection Status: 
        <br />
        Account: {stats.account}
        <br />
        Balance: {stats.account_balance}
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
