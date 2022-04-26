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


export default function who({isMobile=false}) {
    return (
        <div style={{fontFamily: 'DM Sans', textAlign: 'center', fontStyle: 'normal'}}>
            <p style={{ fontSize: '2em', color: '#1EC1F7'}}>
                We’re on a mission to help people lower their blood sugar.
            </p>
            <p style={{color: '#262626'}}>
                Click <a style={{color: '#1EC1F7'}} 
                    href="https://react.semantic-ui.com/collections/grid/#content-columns">
                    here</a> to see academic research on the potential between Blockchains and the Healthcare Industry.
            </p>
            <Grid style={{paddingTop: '3em'}} stackable>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Grid>
                            <Grid.Row>
                            <Grid.Column width={8}>
                            <Image
                      src="/SVG/alejandro.svg"
                      alt="Alejandro Marquez"
                      width={isMobile ? 120 : 240}
                      height={isMobile ? 120 : 240}
                  />
                            </Grid.Column>
                            <Grid.Column width={8}>
                        <a style={{ fontSize: '1.5em', marginBottom: '0px', color: '#1EC1F7'}}>
                            {'Alejandro Marquez'}
                        </a>
                        <p>
                            {'Alejandro is Type 1 Diabetic. He originated the project. He works as a software developer at a healthcare software company.'}
                        </p>
                </Grid.Column>
                </Grid.Row>
                </Grid>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Grid>
                            <Grid.Row>
                            <Grid.Column width={8}>
                            <Image
                      src="/SVG/bryan.svg"
                      alt="Bryan Murren"
                      width={isMobile ? 120 : 240}
                      height={isMobile ? 120 : 240}
                  />
                            </Grid.Column>
                            <Grid.Column width={8}>
                        <a style={{ fontSize: '1.5em', marginBottom: '0px', color: '#1EC1F7'}}>
                            {'Bryan Murren'}
                        </a>
                        <p>
                            {'Bryan’s day job is as an architectural designer. He spends his time learning to design a more equitable future. He led the way on UX/Design.'}
                        </p>
                </Grid.Column>
                </Grid.Row>
                </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
      </div>
    );
};
