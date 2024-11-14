import { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types'; // Import PropTypes

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ datesData, onSelectEvent }) => {
  const events = useMemo(() => {
    return datesData.map((slot) => {
      const startDate = moment(slot.startDate, 'MM/DD/YYYY').toDate(); // Convert string to Date
      console.log(startDate)
      const endDate = moment(slot.endDate, 'MM/DD/YYYY').add(1, 'days').toDate(); // Add one day to include the end date
      // const endDate = moment(slot.endDate, 'MM/DD/YYYY').toDate(); // Convert string to Date
      console.log(endDate)
      return {
        slotId: slot.id,
        name: slot.name,
        title: `Batch: ${slot.name} - ${slot.availableSeats} seats available`,
        start: startDate,
        end: endDate,
        allDay: true,
      };
    });
  }, [datesData]);

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
