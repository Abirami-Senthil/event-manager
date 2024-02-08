import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const EventList = ({ events }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchInput = useRef(null);

    const updateSearchTerm = () => {
        setSearchTerm(searchInput.current.value);
    };

    
    const renderEvents = (eventArray) =>
        eventArray
            .filter((el) => matchSearchTerm(el))
            .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
            .map((event) => (
            <li key={event.id}>
                <NavLink to={`/events/${event.id}`}>
                {event.event_date}
                {' - '}
                {event.event_type}
                </NavLink>
            </li>
        ));

    const matchSearchTerm = (obj) => {
        const { id, published, created_at, updated_at, ...rest } = obj;
        return Object.values(rest).some(
            (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
    };
        

    return (
        <section className="eventList">
          <h2>
            Events
            <Link to="/events/new">New Event</Link>
          </h2>
    
          <input
            className="search"
            placeholder="Search"
            type="text"
            ref={searchInput}
            onKeyUp={updateSearchTerm}
          />
    
          <ul>{renderEvents(events)}</ul>
        </section>
    );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    event_type: PropTypes.string,
    event_date: PropTypes.string,
    title: PropTypes.string,
    speaker: PropTypes.string,
    host: PropTypes.string,
    published: PropTypes.bool,
  })).isRequired,
};

export default EventList;