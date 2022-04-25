import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import App from './app';

export default props => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
      </Head>
      <App />
      {props.children}
    </>
  );
};
