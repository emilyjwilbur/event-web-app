import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

export default function EventFilters({setPredicate, predicate, loading}) {
    return (
        <> 
            <Menu vertical size='large' style={{width: '100%'}} >
                <Header icon='filter' attached color='blue' content='Filters' />
                <Menu.Item 
                content='All Events' 
                active={predicate.get('filter') === 'all'}
                onClick={() => setPredicate('filter', 'all')}
                disabled={loading}
                />
                <Menu.Item content="I'm Going"
                 active={predicate.get('filter') === 'isGoing'}
                 onClick={() => setPredicate('filter', 'isGoing')}
                 disabled={loading}
                 />
                <Menu.Item content="I'm Hosting" 
                active={predicate.get('filter') === 'isHosting'}
                onClick={() => setPredicate('filter', 'isHosting')}
                disabled={loading}
                />
            </Menu>
            <Header icon='calendar' attached color='blue' content='Select Date' />
            <Calendar 
            onChange={date => setPredicate('startDate', date)}
            value={predicate.get('startDate') || new Date()}
            tileDisabled={() => loading}
            />
        </>
    )
}