import FullCalendar from "@fullcalendar/react";
import daygrid from "@fullcalendar/daygrid";
import { getAllrecords } from "../../Service/UserService";
import { useEffect, useState } from "react";
import { formatDate } from "@fullcalendar/core";

const Calendar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllrecords().then((records) => {
      setData(records);
    });
  }, []);

  const eventcolor = ['#ff1d58','#f75990','#fff685','#00DDFF','#0049B7'];
  const events = [];

  for (var i = 0; i < data.length; i++) {
    events[i] = {
      title: "   " +data[i].message,
      start: new Date(data[i].begindate),
      end: new Date(data[i].enddate),
      color  : eventcolor[Math.floor(Math.random()*6)],
    };
  }

  console.log(events)

  return (
    <div>
      <h1>Team view</h1>
      <FullCalendar
        plugins={[daygrid]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Calendar;
