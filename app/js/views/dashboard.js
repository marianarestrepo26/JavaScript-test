import { getUser, logoutUser } from "../auth.js";
import { getData } from "../API/API.js";

export default function dashboardView(container) {
  const user = getUser();

  container.innerHTML = `    
    <div class="dashboard">
      <section class="nav">
        <div class="nav-left">
          <ul>
            <li><a href="#/dashboard/events/enrollments" data-link="enrollments">Enrollments</a></li>
            <li><a href="#/" data-link="dashboard">Events</a></li>
            <li><a href="#/login" data-link="login" id='logout'>Logout</a></li>
          </ul>
        </div>
      </section>
      <section>
        <div class="button" id="newEventBtn">
            <button type="button"> Add new event</button>
        </div>
        <div class="event-components" id="eventComponents">
            <div class="name-event">Name</div>
            <div class="description-event">Description event</div>
            <div class="capacity-event">Capacity</div>
            <div class="date-event">Date</div>
        </div>
        <div class="event" id="eventsList"></div>
      </section>
    </div>`;

  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    logoutUser();
  });

  const eventsList = document.getElementById("eventsList");
  getData("events")
    .then((events) => {
      eventsList.innerHTML = events
        .map((event) => ( `
          <div class="event">
            <h3>${event.name}</h3> <p>${event.description}</p>
            <p>${event.date}</p> <p>${event.capacity}</p>
          </div>`
        ))
        .join("");
    })
    .catch(() => {
      eventsList.textContent = "Error cargando eventos";
    });
}
