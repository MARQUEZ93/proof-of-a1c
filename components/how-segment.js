import { Grid, Segment } from 'semantic-ui-react';
import How from './how';

import howDescriptions from './helpers/how-descriptions';

export default function howSegment({ isMobile=false }) {
    return (
      <div style={{backgroundColor: '#F1F1F1', paddingBottom: '3em', paddingTop: '5em', marginBottom: '3em' }} id="try-it-out">
        <Segment style={{ width: '75%', margin: 'auto', padding: '0em', 
        backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE'}} vertical>
          <div style={{paddingTop: '3em'}}>
            <p style={{ fontSize: '1.1em', textAlign: 'left', fontWeight: 'bold'}}>
                                  {'Can I try it out?'}
            </p>
            <p style={{ fontSize: '2.5em', textAlign: 'left', fontWeight: 'bold', color: '#1EC1F7'}}>
                                  {'Glad you asked!'}
            </p>
            <Grid stackable textAlign='center' verticalAlign='middle' style={{paddingTop: '1em'}}>
              <Grid.Row style={{marginBottom: isMobile ? '2em': '0'}}>
                <How isMobile={isMobile} button={'connect'} description={howDescriptions.connect} title={'1. Connect your Web3 Wallet'}/>
              </Grid.Row>
              <Grid.Row style={{marginBottom: isMobile ? '2em': '0'}}>
                <How isMobile={isMobile} button={'authenticate'} description={howDescriptions.authenticate} title={'2. Authenticate with Dexcom'}/>
              </Grid.Row>
              <Grid.Row style={{marginBottom: isMobile ? '2em': '0'}}>
                <How isMobile={isMobile} button={'deploy'} description={howDescriptions.deploy} title={'3. Deploy your Smart Contract'}/>
              </Grid.Row>
              <Grid.Row>
                <How isMobile={isMobile} button={'contract'} description={howDescriptions.explain} title={'4. Lower your A1C. Earn Ethereum'}/>
              </Grid.Row>
            </Grid>
          </div>
        </Segment>
      </div>
  )
};