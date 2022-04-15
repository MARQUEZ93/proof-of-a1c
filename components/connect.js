import { useEffect, useState, useReducer, useCallback } from "react";

import { ethers, providers } from "ethers";
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

  let web3Modal;
  if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      network: "rinkeby", // optional
      providerOptions // required
    });
  };

  const StateType = {
    provider: null, 
    web3Provider:null,
    address: '',
    chainId: null
  };
  
  const actionType = {
    'SET_WEB3_PROVIDER': {
        provider: StateType['provider'],
        web3Provider: StateType['web3Provider'],
        address: StateType['address'],
        chainId: StateType['chainId']
    }, 
    'SET_ADDRESS': {
      address: StateType['address']
    }, 
    'SET_CHAIN_ID': {
      chainId: StateType['chainId']
    }, 
    'RESET_WEB3_PROVIDER': {}
  };
  
  const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_WEB3_PROVIDER':
        return {
          ...state,
          provider: action.provider,
          web3Provider: action.web3Provider,
          address: action.address,
          chainId: action.chainId,
        };
      case 'SET_ADDRESS':
        return {
          ...state,
          address: action.address,
        };
      case 'SET_CHAIN_ID':
        return {
          ...state,
          chainId: action.chainId,
        };
      case 'RESET_WEB3_PROVIDER':
        return initialState;
      default:
        throw new Error();
    }
  };

export default function connect() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state;

  const connect = useCallback(async function () {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()

    dispatch({
      type: 'SET_WEB3_PROVIDER',
      provider,
      web3Provider,
      address,
      chainId: network.chainId,
    })
  }, []);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    console.log(web3Modal);
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload()
      }

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect();
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  return ( 
  
  <>
            {!address ? (
                <Button as='a' circular onClick={connect} style={{ 
                  backgroundColor: '#1EC1F7', textAlign: 'center', color: 'white' }}
                >
                  Connect Wallet
                </Button>
            ) : (
                <>
                    <span>{`Account: ${address}`}</span>
                    {/* <span>{`Connected to: Ethereum ${networkName ? networkName.charAt(0).toUpperCase() 
                        + networkName.slice(1) : "No Network"}`}</span> */}
                        <span>{`Connected to: Ethereum ${chainId ? chainId : "No Network"}`}</span>
                    <Button as='a' circular onClick={disconnect}>Disconnect</Button>
                </>
            )}
  </>
  );
}
