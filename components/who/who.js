import Image from 'next/image';
import { Grid } from 'semantic-ui-react';

export default function who({ isMobile=false, link, name, description, src}) {
    return ( 
        <Grid>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Image
                        src={src}
                        alt={name}
                        width={isMobile ? 120 : 240}
                        height={isMobile ? 120 : 240}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <a className='textAlignCenter' style={{ fontSize: '1.5em', marginBottom: '0px', color: '#1EC1F7' }}>
                        {name}
                    </a>
                    <p className='textAlignCenter'>
                        {description}
                    </p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};
