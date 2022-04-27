import { Button } from 'semantic-ui-react';

export default function ResuableButton({ title, callback, color, backgroundColor }) {
    return (<Button onClick={callback} style={{ 
                cursor: 'pointer',
                fontWeight: '300',
                color, 
                padding: '10px',
                width: '12em',
                fontSize: '1.2em', textAlign: 'center', backgroundColor, 
                // boxSizing sets how the total width and height of an element is calculated.
                borderRadius: '5em', border: '0.1em solid #1EC1F7', boxSizing: 'border-box'}}
            >
                {title}
            </Button>
    );
};