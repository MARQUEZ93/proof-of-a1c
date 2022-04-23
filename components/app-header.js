/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { RiShieldCrossLine } from 'react-icons/ri';
import { IconContext } from "react-icons";
import Image from 'next/image';
import Info from './info';
import How from './how';
import Who from './who';
import {Link} from 'react-scroll';
import GetStarted from './get-started';

import "@fontsource/dm-sans";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  BreadcrumbDivider,
} from 'semantic-ui-react';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = { to: 'home' };

  handleSetActive = (to) => {
    this.setState({to})
  };

  render() {
    const { children } = this.props;

    return (
      <Media greaterThan='mobile' style={{backgroundColor: '#F1F1F1'}}>
        <Visibility
          once={false}
        >
            <Menu
              fixed='top'
              secondary={true}  
              size='large'
              style={{ paddingTop: '25px', paddingLeft: '-25px', width: '100%', 
                backgroundColor: '#F1F1F1'}}
            >
              <Container style={{ display: 'flex', flexDirection: 'row', 
                alignItems: 'center'}}>

                <Link smooth={true} to="home"><Menu.Item header style={{cursor: 'pointer'}} position='left'>
                   <Image
                      src="/SVG/logo.svg"
                      alt="Proof of A1C"
                      width={400}
                      height={26.8}
                  />
                </Menu.Item></Link>
                <Menu.Menu pointing secondary position='right' style={{fontFamily: 'DM Sans', 
                  fontStyle: 'normal'}}>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="home"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'home' ? '900':'300'}}>Home</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="why"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'why' ? '900':'300'}}>Why</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="get-started"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'get-started' ? '900':'300'}}>How</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="contact"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'contact' ? '900':'300'}}>Contact</Menu.Item></Link>
                </Menu.Menu>
              </Container>
            </Menu>
        </Visibility>

        {children}
      </Media>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = { to: 'home' };

  handleSetActive = (to) => {
    this.setState({ to })
  };

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile' style={{backgroundColor: '#F1F1F1'}}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
            style={{ paddingTop: '10em', paddingLeft: '10em', width: '100%', 
                backgroundColor: '#F1F1F1'}}
          >
             <Container style={{ display: 'flex', flexDirection: 'row', 
                alignItems: 'center'}}>

                <Link smooth={true} to="home"><Menu.Item header style={{cursor: 'pointer'}} position='left'>
                   <Image
                      src="/SVG/logo.svg"
                      alt="Proof of A1C"
                      width={400}
                      height={26.8}
                  />
                </Menu.Item></Link>
                <Menu.Menu pointing secondary position='right' style={{fontFamily: 'DM Sans', 
                  fontStyle: 'normal'}}>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="home"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'home' ? '900':'300'}}>Home</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="why"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'why' ? '900':'300'}}>Why</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="get-started"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'get-started' ? '900':'300'}}>How</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="contact"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'contact' ? '900':'300'}}>Contact</Menu.Item></Link>
                </Menu.Menu>
              </Container>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
              <Menu
              fixed='top'
              secondary={true}  
              size='large'
              style={{ paddingTop: '25px', paddingLeft: '-25px', width: '100%', 
                backgroundColor: '#F1F1F1'}}
            >
              <Container style={{ display: 'flex', flexDirection: 'row', 
                alignItems: 'center'}}>

                <Link smooth={true} to="home"><Menu.Item header style={{cursor: 'pointer'}} position='left'>
                   <Image
                      src="/SVG/logo.svg"
                      alt="Proof of A1C"
                      width={400}
                      height={26.8}
                  />
                </Menu.Item></Link>
                <Menu.Menu pointing secondary position='right' style={{fontFamily: 'DM Sans', 
                  fontStyle: 'normal'}}>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="home"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'home' ? '900':'300'}}>Home</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="why"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'why' ? '900':'300'}}>Why</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="get-started"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'get-started' ? '900':'300'}}>How</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="contact"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'contact' ? '900':'300'}}>Contact</Menu.Item></Link>
                </Menu.Menu>
              </Container>
            </Menu>
              </Container>
              {/* <HomepageHeading mobile /> */}
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const descriptions = {
  "why": "Each time you go for a run, walk after a meal or pass up a pizza, you work towards lowering your blood sugar. With Proof of A1C, every month you achieve a safe blood sugar, you will be rewarded Ethereum.",
  "exist": "Insurance companies currently promote healthy behavior with lower premiums for those enrolled in wellness programs. Our idea is to incentivize with an appreciating digital asset. Preventitive care (lowering your blood sugar) improves long term health outcomes & reduces health care costs. Both the plan-member & the provider benefit! ",
  "next": "Proof of A1C aims to provide a service between insurance providers and their plan members. By creating a smart contract between them, the provider can monitor the plan-member's blood sugar & reward them when they maintain a safe level."
};

const howDescriptions = {
  "connect": "Connect your Web3 wallet to the Ethereum Rinkeby Test Network. This will allow you to deploy a Proof Of A1C smart contract.",
  "authenticate": "Authentication provides Proof of A1C the necessary access tokens to query your Dexcom CGM System. The query results allow Proof Of A1C to record your monthly blood sugar average.",
  "deploy": "Proof of A1C donates Ethereum to your smart contract as an incentivize. The contract is then triggered to record your monthly blood sugar results using your Dexcom credentials.",
  "explain": "After every monthly blood sugar recording, the smart contract measures your monthly average blood sugar. If below 154 mg/dL, the contract rewards it's entire Ethereum balance to your Web3 Wallet!"
}

const HomepageLayout = () => (
  <ResponsiveContainer style={{backgroundColor: '#F1F1F1'}}>
    <Segment style={{ padding: '9em 0em', backgroundColor: '#F1F1F1', border: 'none'}} vertical id="home">
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8} style={{paddingLeft: '8em'}}>
            <Header as='h3' style={{ fontSize: '3em', textAlign: 'center' }}>
              The healthy lifestyle platform for <span style={{color: '#1EC1F7'}}>young</span> adults
            </Header>
            <p style={{ fontSize: '1.33em', textAlign: 'center'}}>
              Encourage lower blood sugar* by earning Ethereum**
            </p>
            <p style={{ fontSize: '0.8em', textAlign: 'center', marginBottom: '-1px'}}>
              *Use of this platform requires a Dexcom CGM device
            </p>
            <p style={{ fontSize: '0.8em', textAlign: 'center'}}>
              **Ethereum Rinkeby Test Network
            </p>
            <GetStarted style={{textAlign: 'center'}} />
          </Grid.Column>
          <Grid.Column floated='right' width={6} style={{}}>
            <Image width="476" height="373" src='/PNG/lady.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <div id="why" style={{backgroundColor: '#F1F1F1', paddingTop: '3em', paddingBottom: '3em'}}>
      <Segment style={{ width: '75%', margin: 'auto', padding: '0em', 
        backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE' }} vertical>
        <Info textRight={true} description={descriptions.why} header={'Motivation for healthy '} lastHeaderWord={'living'}
          question={'Why Proof of A1C?'} image={'/SVG/why.svg'}
        />
        <Info textRight={false} description={descriptions.exist} header={'Yes, but '} lastHeaderWord={'no'}
          question={`...doesn't this already exist?`} image={'/SVG/exist.svg'}
        />
        <Info textRight={true} description={descriptions.next} header={'This platform is a proof of '} lastHeaderWord={'concept'}
          question={`So, what's next? We all have dreams...`} image={'/SVG/next.svg'}
        />
      </Segment>
    </div>

    <div style={{backgroundColor: '#F1F1F1', fontFamily: 'DM Sans',
            fontStyle: 'normal', paddingBottom: '3em', paddingTop: '5em', marginBottom: '3em' }} id="get-started">
      <Segment style={{ width: '75%', margin: 'auto', padding: '0em', 
        backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE'}} vertical>
          <div style={{paddingTop: '3em'}}>
            <p style={{ fontSize: '1.1em', textAlign: 'left', fontWeight: 'bold'}}>
                                  {'Can I try it out?'}
            </p>
            <p style={{ fontSize: '2.5em', textAlign: 'left', fontWeight: 'bold', color: '#1EC1F7'}}>
                                  {'Glad you asked!'}
            </p>
            <Grid>
              <Grid.Row>
                <How button={'connect'} description={howDescriptions.connect} title={'1. Connect your Web3 Wallet'}/>
                <How button={'authenticate'} description={howDescriptions.authenticate} title={'2. Authenticate with Dexcom'}/>
              </Grid.Row>
              <Grid.Row>
                <How button={'deploy'} description={howDescriptions.deploy} title={'3. Deploy your Smart Contract'}/>
                <How button={'contract'} description={howDescriptions.explain} title={'4. Lower your A1C. Earn Ethereum'}/>
              </Grid.Row>
            </Grid>
          </div>
      </Segment>
    </div>

    <div style={{backgroundColor: '#F1F1F1', paddingTop: '3em', paddingBottom: '2em'}} id="contact">
      <Segment style={{ width: '75%', margin: 'auto', paddingTop: '5em', 
        backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE' }} vertical>
          <Who />
      </Segment>
    </div>

    <Segment vertical style={{ backgroundColor: '#262626', paddingTop: '1.5em', paddingBottom: '1em', color: '#FEFEFE' }}>
      <Container>
        <Grid divided stackable>
          <Grid.Row>
          <Grid.Column width={8}>
            {/* MVP TODO fix double authenticate */}
              <a href="mailto:ProofOfA1C@gmail.com">
                <Header as='h4' style={{color: '#FEFEFE', fontSize: '1.2em', marginBottom: '5px'}}>
                  ProofOfA1C@Gmail.com
                </Header>
              </a>
              <p style={{ fontSize: '0.8em'}}>
              All rights reserved.
            </p>
            </Grid.Column>
            <Grid.Column width={8}>
              <a href="mailto:ProofOfA1C@gmail.com">
                <Header as='h4' style={{color: '#FEFEFE', fontSize: '1.2em', marginBottom: '5px'}}>
                  Auxiliary Websites
                </Header>
              </a>
              <List link horizontal>
                <List.Item><a style={{color: '#FEFEFE', fontSize: '10px'}} href="https://dromarquez.com">Academic Blockchain & Medical Articles</a></List.Item>
                <List.Item><a style={{color: '#FEFEFE', fontSize: '10px'}} href="https://github.com/marquez93/proof-of-a1c">Open Source Code</a></List.Item>
                <List.Item><a style={{color: '#FEFEFE', fontSize: '10px'}} href="https://dromarquez.com/about">Alejandro Marquez</a></List.Item>
                <List.Item><a style={{color: '#FEFEFE', fontSize: '10px'}} href="https://dromarquez.com">Bryan Murren</a></List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout