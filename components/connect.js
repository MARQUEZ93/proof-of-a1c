import { useEffect, useState } from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../ethereum/providerOptions";

import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react';

// const web3Modal = new Web3Modal({
//   cacheProvider: true, // optional
//   providerOptions // required
// });

export default function connect() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState();
  const [web3Modal, setWeb3Modal] = useState();
  const [networkName, setNetworkName] = useState("");

  const connectWallet = async () => {
    try {
        setWeb3Modal(new Web3Modal({
            cacheProvider: true, // optional
            providerOptions // required
          }));
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      console.log(library);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setNetworkName(network.name);
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return ( <div style={{display: 'flex', flexDirection: 'column' }}>
            {!account ? (
                <Button as='a' circular onClick={connectWallet}>Connect</Button>
            ) : (
                <>
                    <span>{`Account: ${account}`}</span>
                    <span>{`Connected to: Ethereum ${networkName ? networkName.charAt(0).toUpperCase() 
                        + networkName.slice(1) : "No Network"}`}</span>
                    <Button as='a' circular onClick={disconnect}>Disconnect</Button>
                </>
            )}
        </div>
  );
}
