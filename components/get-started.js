import {Link} from 'react-scroll';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react';

export default function getStarted() {

  return ( 
                <Link to="get-started" smooth><div style={{ 
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
                  Get Started
                </div></Link>
            ); 
}
