import Link from "next/link";

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

export default function Footer() {
  return (
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
                <List.Item><a style={{color: '#FEFEFE', fontSize: '10px'}} href="https://dromarquez.com/about">Alejandro Marquez</a></List.Item>
                <List.Item><a style={{color: '#FEFEFE', fontSize: '10px'}} href="https://dromarquez.com">Bryan Murren</a></List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
};
