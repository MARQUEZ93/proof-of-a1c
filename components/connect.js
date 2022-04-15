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
    chainId: null,
    network: null
  };
  
  const actionType = {
    'SET_WEB3_PROVIDER': {
        provider: StateType['provider'],
        web3Provider: StateType['web3Provider'],
        address: StateType['address'],
        chainId: StateType['chainId'],
        network: StateType['network']
    }, 
    'SET_ADDRESS': {
      address: StateType['address']
    }, 
    'SET_CHAIN_ID': {
      chainId: StateType['chainId']
    }, 
    'SET_NETWORK': {
      network: StateType['network']
    },
    'RESET_WEB3_PROVIDER': {}
  };
  
  const initialState = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
    network: null
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
          network: action.network
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
      case 'SET_NETWORK':
        return {
          ...state,
          network: action.network,
        };
      case 'RESET_WEB3_PROVIDER':
        return initialState;
      default:
        throw new Error();
    }
  };

export default function connect() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId, network } = state;

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
      network: network.name
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
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <span style={{color: '#1EC1F7', fontSize: '0.8em',}}>{'Rinkeby Test Network'}</span>
                <div onClick={connect} style={{ 
                  fontFamily: 'DM Sans',
                  cursor: 'pointer',
                  fontStyle: 'normal',
                  fontWeight: '200',
                  color: '#FEFEFE',
                  margin: 'auto', width: '50%',
                  transform: 'rotate(0.16deg)', 
                  fontSize: '1.2em', textAlign: 'center', backgroundColor: '#1EC1F7', 
                  borderRadius: '48px', border: '1px solid #FEFEFE', boxSizing: 'border-box'}}
                >
                  Connect Wallet
                </div>
                </div>
            ) : (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <span style={{color: '#1EC1F7', fontSize: '0.8em'}}>{`${
                    network.charAt(0).toUpperCase() 
                    + network.slice(1)} Test Network (${address.slice(0, 5)}...${address.slice(38)})`}</span>
                  <div onClick={disconnect} style={{ 
                    fontFamily: 'DM Sans',
                    cursor: 'pointer',
                    fontStyle: 'normal',
                    fontWeight: '200',
                    color: '#1EC1F7',
                    margin: 'auto', width: '50%',
                    transform: 'rotate(0.16deg)', 
                    fontSize: '1.2em', textAlign: 'center', backgroundColor: '#FEFEFE', 
                    borderRadius: '48px', border: '1px solid #1EC1F7', boxSizing: 'border-box'}}
                  >
                    Disconnect Wallet
                  </div>
                </div>
            )}
  </>
  );
}
