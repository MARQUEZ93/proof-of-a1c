import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../routes';

class ContractNew extends Component {

  constructor(props){
    super(props);
    this.state = {
      errorMessage: '',
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async event => {
    event.preventDefault();
    // this.setState({ loading: true, errorMessage: '' });

    try {
      window.ethereum.enable();
      const accounts = await web3.eth.requestAccounts();
      console.log(accounts);
      const result = await factory.methods
        .createProofOfA1C()
        .send({
          from: accounts[0]
        });
        console.log(result);
        // create user here
      // Router.pushRoute('/');
    } catch (err) {
      console.log(err);
      // this.setState({ errorMessage: err.message });
    }

    // this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Deploy a Proof of A1C Contract</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Deploy!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default ContractNew;
