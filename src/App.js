import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect, useState } from "react";

// Constants
const BUILDSPACE_TWITTER_HANDLE = '_buildspace';
const BUILDSPACE_TWITTER_LINK = `https://twitter.com/${BUILDSPACE_TWITTER_HANDLE}`;
const TWITTER_HANDLE = 'redditech';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {

  //state variable to store user's public wallet
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    // First make sure we have access to window.ethereum

    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }


    // Check we're authorised to access the user's wallet
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    // Use can have multiple authorised accounts, grab the first one if it is there
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  // implement connect wallet method
  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      // request access to account.
      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      // This should print out the public address once we authorise Metamask
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  // Run our function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount===""? renderNotConnectedContainer() : (
            <button onClick={null} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
          <span className="footer-text"> &nbsp; for my project on &nbsp;</span>
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={BUILDSPACE_TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`@${BUILDSPACE_TWITTER_HANDLE}`}</a>
          <span className='footer-text'>&nbsp;:&nbsp;"Mint your own NFT collection and ship a Web3 app to show them off"</span>
        </div>
      </div>
    </div>
  );
};

export default App;
