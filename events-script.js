/* ============================================================
   WEEKLY UPDATE ZONE
   Edit WEEK_OF and the EVENTS array every Monday.
   Each event needs: day, date, time, title, location, desc, link
   "day" must be one of: Monday, Tuesday, Wednesday, Thursday,
   Friday, Saturday, Sunday — used to group and to highlight today.
   "link" and "desc" are optional — leave as "" if not needed.
   Delete last week's events and paste in the new ones.
   ============================================================ */

const WEEK_OF = "September 21, 2026";

const EVENTS = [
  {
    day: "Monday",
    date: "September 21",
    time: "9:00 AM",
    title: "College of Education Kickoff",
    location: "CCOB Lobby",
 //   desc: "Drop by with a printed or digital resume for a 10-minute review from career services staff.",
   // link: ""
  },
    {
    day: "Monday",
    date: "September 21",
    time: "5:00 PM",
    title: "Finance and Economics Club Meeting",
    location: "CCOB Lobby",
 //   desc: "Drop by with a printed or digital resume for a 10-minute review from career services staff.",
   // link: ""
  },
  {
    day: "Tuesday",
    date: "September 22",
    time: "11:00 AM",
    title: "T.W Lewis Speaker Johnnie Moore",
    location: "CCOB Lobby",
   // desc: "Guest speaker from a local investment firm, plus club elections for next semester.",
    //link: "#"
  },{
    day: "Tuesday",
    date: "September 22",
    time: "4 PM",
    title: "Finanacial Planning Association Panel",
    location: "CCOB Lobby",
   // desc: "Guest speaker from a local investment firm, plus club elections for next semester.",
    //link: "#"
  },{
    day: "Tuesday",
    date: "September 22",
    time: "6:30 PM",
    title: "Women in Business Club Event",
    location: "42-182",
   // desc: "Guest speaker from a local investment firm, plus club elections for next semester.",
    //link: "#"
  },
  {
    day: "Wednesday",
    date: "September 23",
    time: "1:30 PM",
    title: "IDEA Club Bible Study",
    location: "CCOB Library",
   // desc: "Meet recruiters and learn about internship and full-time openings across departments.",
   // link: "#"
  },
    {
    day: "Wednesday",
    date: "September 23",
    time: "3:30 PM",
    title: "CCOB Fall Kickoff",
    location: "CCOB Courtyard",
   // desc: "Meet recruiters and learn about internship and full-time openings across departments.",
   // link: "#"
  },
    {
    day: "Wednesday",
    date: "September 23",
    time: "4:00 PM",
    title: "Finance Bible Study",
    location: "Rivers GCBC",
   // desc: "Meet recruiters and learn about internship and full-time openings across departments.",
   // link: "#"
  },
      {
    day: "Wednesday",
    date: "September 23",
    time: "5:00 PM",
    title: "SCHWAB Business Line Presentation",
    location: "CCOB 42-183",
   // desc: "Meet recruiters and learn about internship and full-time openings across departments.",
   // link: "#"
  },
    
  {
    day: "Thursday",
    date: "September 24",
    time: "9:00 AM – 4:00 PM",
    title: "IDEA Club Marketplace",
    location: "CCOB Courtyard",
    //desc: "Practice a real interview with feedback from career coaches. Sign-up required.",
   // link: "#"
  },
    {
    day: "Thursday",
    date: "September 24",
    time: "5:00 PM",
    title: "GCU Money Mentors - Meet the Mentors",
    location: "CCOB Lobby",
    //desc: "Practice a real interview with feedback from career coaches. Sign-up required.",
   // link: "#"
  },
  {
    day: "Friday",
    date: "September 25",
    time: "4:00 PM",
    title: "ASGCU Senate Townhall",
    location: "CCOB Lobby",
  //  desc: "Open session for resume tips and one-on-one feedback from campus career advisors.",
   // link: "#"
  },
    {
    day: "Saturday",
    date: "September 26",
    time: "9:00 AM",
    title: "Project Management Workshop",
    location: "42-181",
    //desc: "Practice a real interview with feedback from career coaches. Sign-up required.",
   // link: "#"
  },
  /*{
    day: "Saturday",
    date: "July 17",
    time: "10:00 AM – 12:00 PM",
    title: "Resume Workshop",
    location: "Student Center, Room 101",
    desc: "Open session for resume tips and one-on-one feedback from campus career advisors.",
    link: "#"
  }*/
];

/* ============================================================
   RENDER LOGIC — no need to touch anything below this line
   ============================================================ */

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getTodayName() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

function groupByDay(events) {
  const groups = {};
  events.forEach(e => {
    if (!groups[e.day]) groups[e.day] = [];
    groups[e.day].push(e);
  });
  return groups;
}

function buildEventCard(e, isToday) {
  return `
    <div class="event-card${isToday ? " today" : ""}">
      <div class="event-time">${e.time}</div>
      <div class="event-main">
        <p class="event-title">${e.title}</p>
        <p class="event-location">📍 ${e.location}</p>
        ${e.desc ? `<p class="event-desc">${e.desc}</p>` : ""}
        ${e.link ? `<a class="event-link" href="${e.link}" target="_blank" rel="noopener noreferrer">More Info ↗</a>` : ""}
      </div>
    </div>
  `;
}

function render() {
  document.getElementById("week-of-label").textContent = WEEK_OF;

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  if (!EVENTS.length) {
    timeline.innerHTML = `<p class="empty-state">No events posted for this week yet — check back Monday.</p>`;
    return;
  }

  const grouped = groupByDay(EVENTS);
  const todayName = getTodayName();

  DAY_ORDER.forEach(day => {
    const eventsForDay = grouped[day] || [];
    const isToday = day === todayName;
    const dayGroup = document.createElement("div");
    dayGroup.className = "day-group";

    const dateLabel = eventsForDay[0]?.date || "";
    const eventsHtml = eventsForDay.length
      ? eventsForDay.map(e => buildEventCard(e, isToday)).join("")
      : `<div class="empty-day"><p>No events scheduled for ${day}.</p></div>`;

    dayGroup.innerHTML = `
      <div class="day-header">
        <span class="day-name${isToday ? " today" : ""}">${day}${dateLabel ? ", " + dateLabel : ""}</span>
        ${isToday ? '<span class="today-badge">Today</span>' : ""}
        <span class="day-rule"></span>
      </div>
      ${eventsHtml}
    `;

    timeline.appendChild(dayGroup);
  });
}

render();
