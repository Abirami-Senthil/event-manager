import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

const EventList = ({ events }) => {
    const renderEvents = (eventArray) => {
      eventArray.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
  
      return eventArray.map((event) => (
        <li key={event.id}>
          <NavLink to={`/events/${event.id}`}>
            {event.event_date}
            {' - '}
            {event.event_type}
          </NavLink>
        </li>
      ));
    };

    return (
        <section className="eventList">
          <h2>Events</h2>
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