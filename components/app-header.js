/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import Connect from './connect';
import { RiShieldCrossLine } from 'react-icons/ri';
import { IconContext } from "react-icons";
import Image from 'next/image';
import Info from './info';
import How from './how';

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
  state = {}

  hideFixedMenu = () => this.setState({ fixed: true })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

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
                <Menu.Item header position='left'>
                   <Image
                      src="/../public/SVG/logo.svg"
                      alt="Proof of A1C"
                      width={400}
                      height={26.8}
                  />
                </Menu.Item>
                <Menu.Menu position='right' style={{fontFamily: 'DM Sans', 
                  fontStyle: 'normal'}}>
                  <Menu.Item style={{color: 'black', cursor: 'pointer', fontWeight: 'bold'}}>Home</Menu.Item>
                  <Menu.Item style={{color: '#262626', cursor: 'pointer'}}>Why</Menu.Item>
                  <Menu.Item style={{color: '#262626', cursor: 'pointer'}}>How</Menu.Item>
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

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

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
  "why": "Each time you go for a run, walk after a meal or pass up a pizza, you work towards lowering your blood sugar. With Proof of A1C, every month you achieve a safe blood sugar, you will be rewarded Etheruem.",
  "exist": "Insurance companies currently incentivize healthy behavior with points for lower premiums. Our idea is to incentivize with an appreciating digital asset. Preventitive care (lowering your blood sugar) improves long term health outcomes & reduces health care costs. Both the plan-member & the provider benefit! ",
  "next": "We believe Proof of A1C can provide a service between insurance providers and their plan members. By creating a smart contract between them, the provider can monitor the plan-member's blood sugar & reward them when they maintain a safe level."
};

const howDescriptions = {
  "connect": "Allow your wallet and the Proof of A1C platform to interact with each other. This creates the initial connection between you and the blood sugar data submitted by Dexcom.",
  "authenticate": "Authentication allows Proof of A1C to query your Dexcom CGM System for your most recent blood sugar level."
}

const HomepageLayout = () => (
  <ResponsiveContainer style={{backgroundColor: '#F1F1F1'}}>
    <Segment style={{ padding: '9em 0em', backgroundColor: '#F1F1F1', border: 'none'}} vertical>
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
            <Connect style={{textAlign: 'center'}}/>
          </Grid.Column>
          <Grid.Column floated='right' width={6} style={{}}>
            <Image width="476" height="373" src='/../public/PNG/lady.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <div style={{backgroundColor: '#F1F1F1', paddingBottom: '3em'}}>
      <Segment style={{ width: '75%', margin: 'auto', padding: '0em', 
        backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE' }} vertical>
        <Info textRight={true} description={descriptions.why} header={'Motivation for healthy '} lastHeaderWord={'living'}
          question={'Why Proof of A1C?'} image={'/../public/SVG/why.svg'}
        />
        <Info textRight={false} description={descriptions.exist} header={'Yes, but '} lastHeaderWord={'no'}
          question={`...doesn't this already exist?`} image={'/../public/SVG/exist.svg'}
        />
        <Info textRight={true} description={descriptions.next} header={'This platform is a proof of '} lastHeaderWord={'concept'}
          question={`So, what's next? We all have dreams...`} image={'/../public/SVG/next.svg'}
        />
      </Segment>
    </div>

    <div style={{backgroundColor: '#F1F1F1', fontFamily: 'DM Sans',
            fontStyle: 'normal' }}>
      <Segment style={{ width: '75%', margin: 'auto', padding: '0em', 
        backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE'}} vertical>
          <div style={{paddingTop: '3em'}}>
          <p style={{ fontSize: '1.1em', textAlign: 'left', fontWeight: 'bold'}}>
                                {'Can I try it out?'}
          </p>
          <p style={{ fontSize: '2.5em', textAlign: 'left', fontWeight: 'bold', color: '#1EC1F7'}}>
                                {'Glad you asked!'}
          </p>
          <Grid >
        {/* width={8} */}
        <Grid.Row>
      <Grid.Column width={8}>
      <p style={{ fontSize: '1.5em', cursor: 'pointer', textDecoration: 'underline', color: '#1EC1F7'}}>
                                {'1. Connect your Web3 Wallet'}
      </p>
                                {howDescriptions.connect}
      </Grid.Column>
      <Grid.Column width={8}>
      <p style={{ fontSize: '1.5em', cursor: 'pointer', textDecoration: 'underline', color: '#1EC1F7'}}>
                                {'2. Authenticate with Dexcom'}
      </p>
      <p>
                                {howDescriptions.authenticate}
                            </p>
      </Grid.Column>
    </Grid.Row>
      </Grid>
        </div>
      </Segment>
    </div>

    <Segment vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header as='h4' content='About' />
              <List link>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as='h4' content='Services' />
              <List link>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4'>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout