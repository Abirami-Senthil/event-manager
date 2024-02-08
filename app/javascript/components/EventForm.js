import React, { useState, useRef, useEffect } from 'react';
import { isEmptyObject, validateEvent, formatDate } from '../helpers/helpers';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';


const EventForm = () => {
  const [event, setEvent] = useState({
    event_type: '',
    event_date: '',
    title: '',
    speaker: '',
    host: '',
    published: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent('event_date', formattedDate);
      },
    });
  
    // Return a cleanup function.
    // React will call this prior to unmounting.
    return () => p.destroy();
  }, []);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    updateEvent(name, value);
  };

  const validateEvent = () => {
    const errors = {};

    if (event.event_type === '') {
      errors.event_type = 'You must enter an event type';
    }

    if (event.event_date === '') {
      errors.event_date = 'You must enter a valid date';
    }

    if (event.title === '') {
      errors.title = 'You must enter a title';
    }

    if (event.speaker === '') {
      errors.speaker = 'You must enter at least one speaker';
    }

    if (event.host === '') {
      errors.host = 'You must enter at least one host';
    }

    return errors;
  };

  const isEmptyObject = (obj) => Object.keys(obj).length === 0;

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      console.log(event);
    }
  };

  const updateEvent = (key, value) => {
    setEvent((prevEvent) => ({ ...prevEvent, [key]: value }));
  };

  return (
    <section>
      {renderErrors()}

      <h2>New Event</h2>
      <form className="eventForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_type">
            <strong>Type:</strong>
            <input
              type="text"
              id="event_type"
              name="event_type"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
            <label htmlFor="event_date">
                <strong>Date:</strong>
                <input
                type="text"
                id="event_date"
                name="event_date"
                ref={dateInput}
                autoComplete="off"
                />
            </label>
            </div>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea
              cols="30"
              rows="10"
              id="title"
              name="title"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>Speakers:</strong>
            <input
              type="text"
              id="speaker"
              name="speaker"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input
              type="text"
              id="host"
              name="host"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>Publish:</strong>
            <input
              type="checkbox"
              id="published"
              name="published"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
};

export default EventForm;