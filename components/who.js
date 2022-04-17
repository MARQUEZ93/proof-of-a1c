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


export default function who() {
    return (
        <div style={{fontFamily: 'DM Sans', textAlign: 'center', fontStyle: 'normal'}}>
            <p style={{ fontSize: '2em', color: '#1EC1F7'}}>
                We’re on a mission to help people lower their blood sugar.
            </p>
            <p style={{color: '#262626'}}>
                Click <a style={{color: '#1EC1F7'}} 
                    href="https://react.semantic-ui.com/collections/grid/#content-columns">
                    here</a> to see what some academic research on the potential between Web3 and the Healthcare Industry.
            </p>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Grid>
                            <Grid.Row>
                            <Grid.Column width={8}>
                            <Image
                      src="/../public/SVG/alejandro.svg"
                      alt="Alejandro Marquez"
                      width={240}
                      height={240}
                  />
                            </Grid.Column>
                            <Grid.Column width={8}>
                        <a style={{ fontSize: '1.5em', marginBottom: '0px', color: '#1EC1F7'}}>
                            {'Alejandro Marquez'}
                        </a>
                        <p>
                            {'Alejandro works as a software engineer at a healthcare software company, he is also Type-1.'}
                        </p>
                        <div style={{ 
                  fontFamily: 'DM Sans',
                  cursor: 'pointer',
                  fontStyle: 'normal',
                  fontWeight: '200',
                  color: '#FEFEFE',
                  margin: 'auto', width: '50%',
                  transform: 'rotate(0.16deg)', 
                  padding: '10px',
                  fontSize: '1.2em', textAlign: 'center', backgroundColor: '#1EC1F7', 
                  borderRadius: '48px', border: '1px solid #FEFEFE', boxSizing: 'border-box'}}
                >
                  Connect Wallet
                </div>
                </Grid.Column>
                </Grid.Row>
                </Grid>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Grid>
                            <Grid.Row>
                            <Grid.Column width={8}>
                            <Image
                      src="/../public/SVG/alejandro.svg"
                      alt="Alejandro Marquez"
                      width={240}
                      height={240}
                  />
                            </Grid.Column>
                            <Grid.Column width={8}>
                        <a style={{ fontSize: '1.5em', marginBottom: '0px', color: '#1EC1F7'}}>
                            {'Alejandro Marquez'}
                        </a>
                        <p>
                            {'Alejandro works as a software engineer at a healthcare software company, he is also Type-1.'}
                        </p>
                        <div style={{ 
                  fontFamily: 'DM Sans',
                  cursor: 'pointer',
                  fontStyle: 'normal',
                  fontWeight: '200',
                  color: '#FEFEFE',
                  margin: 'auto', width: '50%',
                  transform: 'rotate(0.16deg)', 
                  padding: '10px',
                  fontSize: '1.2em', textAlign: 'center', backgroundColor: '#1EC1F7', 
                  borderRadius: '48px', border: '1px solid #FEFEFE', boxSizing: 'border-box'}}
                >
                  Connect Wallet
                </div>
                </Grid.Column>
                </Grid.Row>
                </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
      </div>
    );
};
