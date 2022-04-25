
import Image from 'next/image';
import {
  Segment,
} from 'semantic-ui-react';

import Who from './who';

export default function whoSegment() {
    return (
        <div style={{backgroundColor: '#F1F1F1', paddingTop: '3em', paddingBottom: '2em'}} id="contact">
      <Segment style={{ width: '75%', margin: 'auto', paddingTop: '5em', 
        backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE' }} vertical>
          <Who />
      </Segment>
    </div>
    );
};
