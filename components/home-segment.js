
import Image from 'next/image';
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
import GetStarted from './get-started';


import Who from './who';

export default function homeSegment() {
    return (
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
    );
};
