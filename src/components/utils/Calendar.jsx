import { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMinutes } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = ({ datesData, onSelectEvent }) => {
  const allevents = useMemo(() => {
    return datesData.map((slot) => {
      // Parse the date and adjust to IST (+5:30)
      const startDate = new Date(slot.startDate);
      const endDate = new Date(slot.endDate);

      // Adjust to Indian Standard Time (IST)
      const startIST = addMinutes(startDate, 330); // 330 minutes = 5 hours 30 minutes
      const endIST = addMinutes(endDate, 330);

      return {
        slotId: slot.id,
        name: slot.name,
        title: `Batch: ${slot.name} - ${slot.availableSeats} seats available`,
        start: startIST,
        end: endIST,
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

export default CalendarComponent