import Image from 'next/image';
import {
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
import Deploy from './buttons/deploy';
import Connect from './buttons/connect';
import Authenticate from './buttons/authenticate';
import Contract from './buttons/contract';


export default function how({title, description, button, isMobile=false}) {
    const Button = button === 'connect' ? <Connect isMobile={isMobile}/> : button === 'authenticate' ? <Authenticate isMobile={isMobile}/> : (
        button === 'deploy' ? <Deploy isMobile={isMobile}/> : <Contract isMobile={isMobile}/>);
    return (
        <Grid.Column width={8}>
            <p style={{ fontSize: '1.5em', marginBottom: '0px',
                textDecoration: 'underline', color: '#1EC1F7'}}>
                {title}
            </p>
            <p>
                {description}
            </p>
            {Button}
      </Grid.Column>
    );
};