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


export default function how({number, title, link, description}) {
    const ImageColumn = (<Grid.Column><Image width="476" height="373" src={image} /></Grid.Column>);
    const TextColumn = (<Grid.Column width={8} style={{paddingLeft: '8em'}}>
                            <p style={{ fontSize: '1.1em', textAlign: 'center', fontWeight: 'bold'}}>
                                {question}
                            </p>
                            <Header as='h3' style={{ fontSize: '2.5em', textAlign: 'center' }}>
                                {header} <span style={{color: '#1EC1F7'}}>{lastHeaderWord}</span>
                            </Header>
                            <p style={{ fontSize: '1.1em', textAlign: 'center'}}>
                                {description}
                            </p>
                        </Grid.Column>
    );
    return (
        <Grid columns='equal' stackable style={{fontFamily: 'DM Sans',
            fontStyle: 'normal', paddingTop: '5em'}}>
            <Grid.Row textAlign='center'>
                {textRight ? ImageColumn : TextColumn}
                {textRight ? TextColumn : ImageColumn}
            </Grid.Row>
        </Grid>
    );
};