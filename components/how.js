import { Grid } from 'semantic-ui-react';
import Deploy from './buttons/deploy';
import Connect from './buttons/connect';
import Authenticate from './buttons/authenticate';
import Contract from './buttons/contract';

export default function how({ title, description, button, isMobile=false }) {
    const Button = button === 'connect' ? <Connect isMobile={isMobile}/> : button === 'authenticate' ? <Authenticate isMobile={isMobile}/> : (
        button === 'deploy' ? <Deploy isMobile={isMobile}/> : <Contract isMobile={isMobile}/>);
    return (
        <Grid.Column largeScreen={6} mobile={10} computer={8} style={{backgroundColor: button === 'contract' ? '#F1F1F1' : '#FEFEFE', borderRadius: '40px', padding: '2em', 
            border: button === 'contract' ? '1px solid #1EC1F7':''}}>
            <p style={{ fontSize: '1.5em', marginBottom: '0px', color: '#1EC1F7', textAlign: 'left', fontWeight: 'bold'}}>
                {title}
            </p>
            <p style={{textAlign: 'left'}}>
                {description}
            </p>
            {Button}
      </Grid.Column>
    );
};