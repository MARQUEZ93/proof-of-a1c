
import whyDescriptions from './helpers/why-descriptions';
import Info from './info';
import {
  Segment,
  Sidebar,
} from 'semantic-ui-react';

export default function whySegment({isMobile=false}) {
    return (
        <div id="why" style={{backgroundColor: '#F1F1F1', paddingTop: isMobile ? '0em' : '3em', paddingBottom: '3em'}}>
            <Segment style={{ width: '75%', margin: 'auto', padding: '0em', 
                backgroundColor: '#F1F1F1', borderTop: '2px solid #FEFEFE' }} vertical>
                <Info textRight={true} description={whyDescriptions.why} header={'Motivation for healthy '} lastHeaderWord={'living'}
                question={'Why Proof of A1C?'} image={'/SVG/why.svg'}
                />
                <Info textRight={isMobile} description={whyDescriptions.exist} header={'Yes, but '} lastHeaderWord={'no'}
                question={`...doesn't this already exist?`} image={'/SVG/exist.svg'}
                />
                <Info textRight={true} description={whyDescriptions.next} header={'This platform is a proof of '} lastHeaderWord={'concept'}
                question={`So, what's next? We all have dreams...`} image={'/SVG/next.svg'}
                />
            </Segment>
        </div>
    );
};
