// // src/components/CalendarComponent.js
// import React, { useMemo } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const localizer = momentLocalizer(moment);

// const CalendarComponent = ({ datesData, onSelectEvent }) => {
//   const events = useMemo(() => {
//     return datesData.map((slot) => {
//       console.table(slot);
//       const startDate = new Date(slot.date);
//       const endDate = new Date(slot.date);
//       endDate.setDate(startDate.getDate() + 4); // Add 4 days to create a five-day range

//       return {
//         title: `Batch ${slot.name} - ${slot.seats_available} seats available`,
//         start: startDate,
//         end: endDate,
//         allDay: true,
//       };
//     });
//   }, [datesData]);

//   return (
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500, margin: '50px' }}
//       selectable
//       onSelectEvent={onSelectEvent}
//       views={{ month: true }}
//       defaultView="month"
//     />
//   );
// };

// export default CalendarComponent;


// src/components/CalendarComponent.js
import React, { useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ datesData, onSelectEvent }) => {
  const events = useMemo(() => {
    return datesData.map((slot) => {
      const startDate = moment(slot.startDate, 'MM/DD/YYYY').toDate(); // Convert string to Date
      const endDate = moment(slot.endDate, 'MM/DD/YYYY').toDate(); // Convert string to Date

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

export default CalendarComponent;
