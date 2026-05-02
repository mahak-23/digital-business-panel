import React from "react";
import { useDispatch, useSelector } from "react-redux";

// calendar components style
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calender.css";

//data
import { createEventId } from "../../data/data";
import { setEvents } from "../../features/calendar/calendarSlice";
/* eslint-disable no-restricted-globals */

const Calender = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.events);

  const handleEvents = (newEvents) => {
    dispatch(setEvents(newEvents));
  };

  const handleDataSelect = (selectInfo) => {
    const title = prompt("Please enter the title for the event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm("Are you sure you want to delete it ?")) {
      clickInfo.event.remove();
    }
  };

  return (
    <div className="calender-container">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          allDaySlot={false}
          initialView="timeGridWeek"
          slotDuration="01:00:00"
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends
          nowIndicator
          initialEvents={events}
          eventsSet={handleEvents}
          select={handleDataSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calender;
