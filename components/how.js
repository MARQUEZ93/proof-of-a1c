import Image from 'next/image';
import "@fontsource/dm-sans";
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
import Deploy from './deploy';
import Connect from './connect';
import Authenticate from './authenticate';




export default function how({title, description, button}) {
    const Button = button === 'connect' ? <Connect /> : <Connect />
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