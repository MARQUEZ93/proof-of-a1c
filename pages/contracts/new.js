import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Router  from '../routes';
import { userService } from '../../services';

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
      const accounts = await web3.eth.requestAccounts();
      const result = await factory.methods
        .createProofOfA1C()
        .send({
          from: accounts[0]
        });
        // create user upon successful contract deployment
        userService.create({address: accounts[0]});
      // Router.pushRoute('/');
    } catch (err) {
      // this.setState({ errorMessage: err.message });
    }

    // this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Deploy a Proof of A1C Contract</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

          <Message error header="Something went wrong" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Deploy!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default ContractNew;
