import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

export default function EventFilters({setPredicate, predicate}) {
    return (
        <> 
            <Menu vertical size='large' style={{width: '100%'}} >
                <Header icon='filter' attached color='blue' content='Filters' />
                <Menu.Item content='All Events' />
                <Menu.Item content="I'm Going" />
                <Menu.Item content="I'm Hosting" />
            </Menu>
            <Header icon='calendar' attached color='blue' content='Select Date' />
            <Calendar />
        </>
    )
}