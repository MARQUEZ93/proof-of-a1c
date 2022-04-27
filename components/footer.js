import links from './helpers/links';

import {
  Container,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';

export default function Footer({isMobile = false}) {
  const articles = isMobile ? 'Academic Articles' : 'Blockchain Medical Articles';
  return (
<Segment vertical style={{ backgroundColor: '#262626', paddingTop: '1.5em', paddingBottom: '1em', color: '#FEFEFE' }}>
      <Container>
        <Grid divided>
          <Grid.Row>
          <Grid.Column width={isMobile ? 7:8}>
              <a href="mailto:ProofOfA1C@gmail.com">
                <Header as='h4' style={{color: '#FEFEFE', fontSize: '1.2em', marginBottom: '5px'}}>
                  ProofOfA1C@Gmail.com
                </Header>
              </a>
              <p style={{ fontSize: '0.8em'}}>
              All rights reserved.
            </p>
            </Grid.Column>
            <Grid.Column width={isMobile ? 9:8}>
              <a href="mailto:ProofOfA1C@gmail.com">
                <Header as='h4' style={{color: '#FEFEFE', fontSize: '1.2em', marginBottom: '5px'}}>
                  Auxiliary Websites
                </Header>
              </a>
              <List link horizontal>
                <List.Item><a style={{padding: '0', color: '#FEFEFE', fontSize: isMobile ? '0.6em' : '0.7em'}} href={links.academic}>{articles}</a></List.Item>
                <List.Item><a style={{padding: '0', color: '#FEFEFE', fontSize: isMobile ? '0.6em' : '0.7em'}} href={links.alejandro}>Alejandro Marquez</a></List.Item>
                <List.Item><a style={{padding: '0', color: '#FEFEFE', fontSize: isMobile ? '0.6em' : '0.7em'}} href={links.bryan}>Bryan Murren</a></List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
};
