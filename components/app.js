/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel';
import React, { Component } from 'react';
import Footer from './footer';
import HomeSegment from './home-segment';
import WhySegment from './why-segment';
import HowSegment from './how-segment';
import WhoSegment from './who/who-segment';
import PropTypes from 'prop-types';

import { Link } from 'react-scroll';
import Image from 'next/image';

import {
  Container,
  Menu,
  Visibility,
} from 'semantic-ui-react';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

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
                secondary
                size='large'
                style={{ paddingTop: '25px', paddingLeft: '-25px', width: '100%', 
                  backgroundColor: '#F1F1F1'}}
              >
                <Container style={{ display: 'flex', flexDirection: 'row', 
                  alignItems: 'center'}}>
  
                  <Link smooth={true} to="home"><Menu.Item header style={{cursor: 'pointer'}} position='left'>
                     <Image
                        src="/SVG/proof.svg"
                        alt="Proof of A1C"
                        width={400}
                        height={26.8}
                    />
                  </Menu.Item></Link>
                  <Menu.Menu secondary position='right'>
                    <Link onSetActive={this.handleSetActive} spy smooth={true} to="home"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'home' ? '900':'300'}}>Home</Menu.Item></Link>
                    <Link onSetActive={this.handleSetActive} spy smooth={true} to="why"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'why' ? '900':'300'}}>Why</Menu.Item></Link>
                    <Link onSetActive={this.handleSetActive} spy smooth={true} to="try-it-out"><Menu.Item className="neverWrapMenu" style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'try-it-out' ? '900':'300'}}>Try it out</Menu.Item></Link>
                    <Link onSetActive={this.handleSetActive} spy smooth={true} to="contact"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: this.state.to === 'contact' ? '900':'300'}}>Contact</Menu.Item></Link>
                  </Menu.Menu>
                </Container>
              </Menu>
          </Visibility>

          <HomeSegment />

              <WhySegment />

              <HowSegment />

              <WhoSegment />

              <Footer />
  
          {children}
        </Media>
      )
    }
  };

  class MobileContainer extends Component {
    state = { to: 'home' };
  
    handleSetActive = (to) => {
      this.setState({ to })
    };
  
    handleSidebarHide = () => this.setState({ sidebarOpened: false });
  
    handleToggle = () => this.setState({ sidebarOpened: true });
  
    render() {
      const { children } = this.props;
      const { sidebarOpened } = this.state;
  
      return (
        <Media at='mobile' style={{backgroundColor: '#F1F1F1'}}>
        <Menu 
        fixed='top'
                secondary 
                size='tiny' 
                style={{ paddingTop: '25px', paddingLeft: '-25px', width: '100%', 
                  backgroundColor: '#F1F1F1'}}>
               <Container style={{ display: 'flex', flexDirection: 'row', 
                  alignItems: 'center'}}>
  
                  <Link smooth={true} to="home"><Menu.Item header style={{cursor: 'pointer', paddingRight: '1em'}} position='left'>
                     <Image
                        src="/SVG/proof.svg"
                        alt="Proof of A1C"
                        width={800}
                        height={53.6}
                    />
                  </Menu.Item></Link>
                  <Menu.Menu secondary position='right'>
                    <Link onSetActive={this.handleSetActive} spy smooth={true} to="home">
                      <Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: '400'}}>Home</Menu.Item>
                    </Link>
                    <Link onSetActive={this.handleSetActive} spy smooth={true} to="why">
                      <Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: '400'}}>Why</Menu.Item></Link>
                    <Link onSetActive={this.handleSetActive} spy smooth={true} to="try-it-out"><Menu.Item className="neverWrapMenu" style={{color: '#262626', cursor: 'pointer', fontWeight: '400'}}>Try it out</Menu.Item></Link>
                    <Link onSetActive={this.handleSetActive} spy smooth={true} to="contact"><Menu.Item style={{color: '#262626', cursor: 'pointer', fontWeight: '400'}}>Contact</Menu.Item></Link>
                  </Menu.Menu>
                </Container>
              </Menu>
              <HomeSegment isMobile={true} />

              <WhySegment isMobile={true} />

              <HowSegment isMobile={true}/>

              <WhoSegment isMobile={true} />

              <Footer isMobile={true}/>
              {children}
              </Media>
      );
    }
};

MobileContainer.propTypes = {
  children: PropTypes.node,
};

  DesktopContainer.propTypes = {
    children: PropTypes.node,
  };

const ResponsiveContainer = ({ children }) => (
  /* Heads up!
   * For large applications it may not be best option to put all page into these containers at
   * they will be rendered twice for SSR.
   */
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
);

const App = () => (
  <ResponsiveContainer style={{backgroundColor: '#F1F1F1'}}/>
);

export default App;