import React from 'react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { userService } from '../../services';
import { useSession } from 'next-auth/react';
import links from '../helpers/links';


export default function contract({isMobile=false}) {

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
  const etherscanAddress = links.etherscan + links.factory;

  return (
    <div onClick={onClickFunction} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <a href={etherscanAddress}><div style={{ 
      cursor: 'pointer',
      color: '#1EC1F7',
      width: '12em',
      padding: '10px',
      fontSize: '1.2em', textAlign: 'center', backgroundColor: '#F1F1F1', 
      borderRadius: '48px', border: '1px solid #68D5F9', boxSizing: 'border-box'}}
    >
      View Contract
    </div></a>
    </div>
  );
};