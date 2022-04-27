import Image from 'next/image';
import {
  Grid,
  Header,
} from 'semantic-ui-react';


export default function info({image, question, header, description, lastHeaderWord, textRight}) {
    const ImageColumn = (<Grid.Column><Image width="476" height="373" src={image} /></Grid.Column>);
    const TextColumn = (<Grid.Column width={8} floated='left' style={{paddingLeft: '8em'}}>
                            <p style={{ fontSize: '1.1em', fontWeight: 'bold'}}>
                                {question}
                            </p>
                            <Header as='h3' style={{ fontSize: '2.5em' }}>
                                {header} <span style={{color: '#1EC1F7'}}>{lastHeaderWord}</span>
                            </Header>
                            <p style={{ fontSize: '1.1em' }}>
                                {description}
                            </p>
                        </Grid.Column>
    );
    return (
        <Grid columns='equal' stackable style={{paddingTop: '5em'}}>
            <Grid.Row>
                {textRight ? ImageColumn : TextColumn}
                {textRight ? TextColumn : ImageColumn}
            </Grid.Row>
        </Grid>
    );
};