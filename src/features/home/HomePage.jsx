import React from 'react';
import { Segment, Container, Header, Image, Button, Icon } from 'semantic-ui-react';

export default function HomePage({history}) {
    return(
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container>
                <Header as='h1' inverted>
                    
                    EventSpace
                </Header>
                <Button onClick={() => history.push('/events')} size='huge' inverted >
                    Get Started
                    <Icon name='right arrow' inverted />
                </Button>
            </Container> 
        </Segment>
    )
}