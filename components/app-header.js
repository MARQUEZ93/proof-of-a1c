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
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container style={{display: 'flex'}}>
      <div style={{width: '50%'}}>
        <Header
          as='h3'
          style={{
            fontSize: mobile ? '2em' : '2.7em',
            fontWeight: '700',
            fontFamily: 'DM Sans',
            fontStyle: 'normal',
            lineHeight: '80px',
            textAlign: 'center',
            marginTop: mobile ? '1.5em' : '3em',
          }}
        > 
          The healthy lifestyle platform for young adults
        </Header>
        <Header
          as='h4'
          content='Encourage lower blood sugar* by earning Ethereum**'
          style={{
            fontSize: mobile ? '1.5em' : '1.3em',
            fontWeight: 'normal',
            fontFamily: 'DM Sans',
            fontStyle: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
          }}
        />
        <Header
          as='h6'
          style={{
            fontSize: mobile ? '0.75em' : '1em',
            fontWeight: 'normal',
            fontFamily: 'DM Sans',
            fontStyle: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
          }}
          content='*Use of this platform requires a Dexcom CGM System. **Ethereum Rinkeby Test Network'
        />
      </div>
      {/* <div style={{width: '50%'}}>
        <Image src="/lady_cgm.jpeg" alt="lady_with_cgm" width='475px' height='372px'/>
      </div> */}
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

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
      <Media greaterThan='mobile'>
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
                <Menu.Menu position='right' style={{fontFamily: 'DM Sans', 
                  fontStyle: 'normal'}}>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="home"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'home' ? 'bold':'normal'}}>Home</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="why"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'why' ? 'bold':'normal'}}>Why</Menu.Item></Link>
                  <Link onSetActive={this.handleSetActive} spy smooth={true} to="get-started"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'get-started' ? 'bold':'normal'}}>Get Started</Menu.Item></Link>
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
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Media as={Sidebar.Pushable} at='mobile'>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Why</Menu.Item>
            <Menu.Item color={'blue'} as='a'>How</Menu.Item>
            <Menu.Item as='a'>Leaderboard</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a'>
                      Log in
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
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
  "connect": "Allow your wallet and the Proof of A1C platform to interact with each other. This creates the initial connection between you and the blood sugar data submitted by Dexcom.",
  "authenticate": "Authentication provides Proof of A1C the necessary authentication tokens to query your Dexcom CGM System. Every month, these tokens are used to record your blood sugar average. This recording is used by the smart contract you deploy in the next step.",
  "deploy": "Grant Proof of A1C the ability to make the transaction of submitting your blood sugar data to the blockchain. The smart contract is the agreement that if your blood sugar is below a certain value, Ethereum is rewarded.",
  "explain": "Every month your most recent blood sugar is submitted to the blockchain. When that number reads at a level deemed safe by medical professionals below - you are rewarded Ethereum!"
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

    <div id="get-started" style={{backgroundColor: '#F1F1F1', fontFamily: 'DM Sans',
            fontStyle: 'normal', paddingBottom: '3em', paddingTop: '5em' }}>
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
                <How description={howDescriptions.explain} title={'4. Lower your A1C. Earn Ethereum'}/>
              </Grid.Row>
            </Grid>
          </div>
      </Segment>
    </div>

    <div style={{backgroundColor: '#F1F1F1', paddingBottom: '3em'}}>
      <Segment style={{ width: '75%', margin: 'auto', paddingTop: '6em', 
        backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE' }} vertical>
          <Who />
      </Segment>
    </div>

    <Segment vertical style={{ backgroundColor: '#262626', paddingTop: '3em', paddingBottom: '3em', color: '#FEFEFE' }}>
      <Container>
        <Grid divided stackable>
          <Grid.Row>
          <Grid.Column width={8}>
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