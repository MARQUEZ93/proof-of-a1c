import React, {useState, useEffect} from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Router  from '../routes';
import { userService } from '../../services';
import wallet_model from '../../lib/wallet';

export default function ContractNew() {
  const {web3Loading, getWeb3} = wallet_model();
  const [myWeb3, setMyWeb3] = useState({});

  async function connectWallet () {
    await getWeb3().then((res)=>{
      setMyWeb3({myWeb3: res});
      res.eth.getAccounts().then((result)=>console.log(result));
      res.eth.net.getNetworkType().then(console.log);
    });
  };

  const onSubmit = async event => {
    event.preventDefault();
    // this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.requestAccounts();
      console.log("deployer: " + accounts[0]);
      const result = await factory.methods
        .createProofOfA1C()
        .send({
          from: accounts[0]
        });

        const getContractAddress = await factory.methods.
        diabeticAddresses(accounts[0]).call();

        console.log("contract address: " + getContractAddress);

        // look up deployed Contracts
        // create user upon successful contract deployment
        const userRes = userService.create({address: accounts[0].toLowerCase(), 
          contract: getContractAddress});
      // Router.pushRoute('/');
    } catch (err) {
      console.log(err);
      console.log(err.message);
      // this.setState({ errorMessage: err.message });
    }

    // this.setState({ loading: false });
  };

  return (
      <Layout>
        
        <button className =" btn-inner - text " onClick ={connectWallet}>get accounts</button>
        <h3>Deploy a Proof of A1C Contract</h3>

        <Form onSubmit={onSubmit}>

          <Button primary>
            Deploy!
          </Button>
        </Form>
      </Layout>
  );
};