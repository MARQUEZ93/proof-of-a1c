import { Segment, Grid } from 'semantic-ui-react';

import Who from './who';
import WhoDescriptions from '../helpers/who-descriptions';
import links from '../helpers/links';

export default function whoSegment({ isMobile=false }) {
    return (
      <div style={{backgroundColor: '#F1F1F1', paddingTop: isMobile ? '0em':'3em', paddingBottom: '2em'}} 
        id="contact"
      >
        <Segment className="textAlignCenter" style={{ width: '75%', margin: 'auto', paddingTop: '5em', 
          backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE' }} vertical>
              <p style={{ fontSize: '2em', color: '#1EC1F7'}}>
                  We’re on a mission to help people lower their blood sugar.
              </p>
              <p style={{color: '#262626'}}>
                  Click <a style={{color: '#1EC1F7'}} 
                      href={links.academic}>
                      here</a> to see academic research on the potential between Blockchains and Continuous Glucose Monitors
              </p>
              <Grid style={{paddingTop: '3em'}} stackable>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Who name='Alejandro Marquez' description={WhoDescriptions.alejandro} 
                      isMobile={isMobile} link={links.alejandro} src={"/SVG/alejandro.svg"}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Who name='Bryan Murren' description={WhoDescriptions.bryan} 
                        isMobile={isMobile} link={links.bryan} src={"/SVG/bryan.svg"}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
        </Segment>
      </div>
    );
};
