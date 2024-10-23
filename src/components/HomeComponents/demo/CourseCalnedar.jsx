import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CourseCalendar = () => {
  const [selectedRange, setSelectedRange] = useState([]);

  const courseDates = [
    { title: '2', date: '2024-09-06' },
    { title: '2', date: '2024-09-07' },
    { title: '1', date: '2024-09-09' },
    { title: '2', date: '2024-09-15' },
    { title: '1', date: '2024-10-07' },
    { title: '1', date: '2024-10-24' },
    { title: '6', date: '2024-11-18' },
    { title: '1', date: '2024-11-19' },
    { title: '1', date: '2024-11-24' },
    { title: '1', date: '2024-11-25' },
    { title: '1', date: '2024-11-26' },
    { title: '1', date: '2024-12-18' },
  ];

 // Convert the course dates into calendar events with a range of six days
const events = useMemo(() => {
    return courseDates.map((course) => {
      const startDate = new Date(course.date);
      const endDate = new Date(course.date);
      endDate.setDate(startDate.getDate() + 4); // Add 5 days to create a five-day range
  
      return {
        title: `Batch ${course.title}`,
        start: startDate,
        end: endDate,
        allDay: true,
      };
    });
  }, [courseDates]);
  
  const handleDateClick = (date) => {
    const range = [];
    for (let i = 0; i <= 5; i++) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + i);
      range.push(nextDate);
    }
    setSelectedRange(range);
  };

  const getEventStyle = (event) => {
    const isInRange = selectedRange.some(
      (selectedDate) => moment(selectedDate).isSame(event.start, 'day')
    );
    const backgroundColor = isInRange ? 'orange' : 'green';
    return { style: { backgroundColor } };
  };

  return (
    <div className="calendar-container" style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)} // Handle clicks on empty slots
        onSelectEvent={(event) => handleDateClick(event.start)} // Handle clicks on events
        eventPropGetter={getEventStyle}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CourseCalendar;
