import { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types'; // Import PropTypes

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ datesData, onSelectEvent }) => {
  const allevents = useMemo(() => {
    return datesData.map((slot) => {
      const startDate = moment(slot.startDate, 'MM/DD/YYYY').toDate(); // Convert string to Date
      const endDate = moment(slot.endDate, 'MM/DD/YYYY').toDate(); // Convert string to Date

      return {
        slotId: slot.id,
        name: slot.name,
        title: `Batch: ${slot.name} - ${slot.availableSeats} seats available`,
        start: startDate,
        end: endDate,
        allDay: true, // Ensuring it's an all-day event
        is_active: slot.is_active,
      };
    });
  }, [datesData]);

  // Today's date
  const today = new Date();

  // Filter events where `start` is greater than today and `is_active` is true
  const events = allevents.filter(
    (event) => event.start > today && event.is_active,
  );

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, margin: '50px' }}
      selectable
      onSelectEvent={onSelectEvent}
      views={{ month: true }}
      defaultView="month"
    />
  );
};

// PropTypes validation
CalendarComponent.propTypes = {
  datesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      availableSeats: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onSelectEvent: PropTypes.func.isRequired,
};

export default CalendarComponent;
