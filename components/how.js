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


export default function how({title, link=true, description}) {
    const cursorStyling = link ? 'pointer' : 'normal';
    const textDecorationStyling = link ? 'underline' : 'none'; 
    return (
        <Grid.Column width={8}>
            <p style={{ fontSize: '1.5em', marginBottom: '0px', cursor:  cursorStyling, 
                textDecoration: textDecorationStyling, color: '#1EC1F7'}}>
                {title}
            </p>
            <p>
                {description}
            </p>
      </Grid.Column>
    );
};