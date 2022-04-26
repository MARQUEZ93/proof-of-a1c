import React, {useState, useEffect} from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import { userService } from '../services';
import { useSession } from 'next-auth/react';


export default function deploy({isMobile=false}) {

  const { data: session, status } = useSession();
  const loading = status === 'loading';
  if (typeof window !== 'undefined' && loading) return null;


  const onSubmit = async event => {
    event.preventDefault();
    // this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.requestAccounts();
      const result = await factory.methods
        .createProofOfA1C()
        .send({
          from: accounts[0]
        });

        const getContractAddress = await factory.methods.
        diabeticAddresses(accounts[0]).call();

        // look up deployed Contracts
        // create user upon successful contract deployment
        const userRes = userService.create({address: accounts[0].toLowerCase(), 
          contract: getContractAddress});
      // Router.pushRoute('/');
    } catch (err) {
      // this.setState({ errorMessage: err.message });
    }

    // this.setState({ loading: false });
  };

  const pointerEventsStyling = session ? 'auto' : 'none';
  const onClickFunction = session ? onSubmit : null;

  return (
    <div onClick={onClickFunction} style={{display: 'flex', flexDirection: 'column'}}>
    <div style={{ 
      fontFamily: 'DM Sans',
      cursor: 'pointer',
      fontStyle: 'normal',
      fontWeight: '200',
      color: '#FEFEFE',
      width: '12em',
      transform: 'rotate(0.16deg)', 
      padding: '10px',
      fontSize: '1.2em', textAlign: 'center', backgroundColor: '#1EC1F7', 
      borderRadius: '48px', border: '1px solid #FEFEFE', boxSizing: 'border-box'}}
    >
      Deploy Contract
    </div>
    </div>
  );
};