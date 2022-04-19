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


export default function how({title, description}) {
    return (
        <Grid.Column width={8}>
            <p style={{ fontSize: '1.5em', marginBottom: '0px',
                textDecoration: 'underline', color: '#1EC1F7'}}>
                {title}
            </p>
            <p>
                {description}
            </p>
      </Grid.Column>
    );
};