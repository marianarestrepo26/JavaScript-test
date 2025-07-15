import { getData } from "../API/API.js";
import { getUser, logoutUser } from "../auth.js";

export function enrollmentsView(container) {
  const user = getUser();

  if (user.role === "admin") {
    const enrollmentsNone = document.getElementById('enrollments');
    enrollmentsNone.style.display = "none";
    return;
  }

  container.innerHTML = `
    <div class="enrollments">
      <section class="navbar" aria-label="main navigation">
        <div class="navbar-menu">
            <div class="navbar-start">
                <ul>
                    <img src=https://api.dicebear.com/9.x/avataaars/svg?seed={username}" alt="Avatar">
                    <li><a class="navbar-item" href="#/" data-link="dashboard">Events</a></li>
                    <li><a class="navbar-item" href="#/dashboard/events/enrollments" data-link="enrollments" id="enrollments">Enrollments</a></li>
                    <li><a class="navbar-item" href="#/login" data-link="login" id='logout'>Logout</a></li>
                </ul>
            </div>
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
      </section>`;

  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    logoutUser();
  });

  const eventsList = document.getElementById("eventsList");

  getData("events").then((events) => {
    eventsList.innerHTML = events.map((event) => (
        `<div>
          <h3>${event.name}</h3> <p>${event.description}</p>
          <button data-event-id="${event.id}" class="register-btn">
            Registrarse
          </button>
        </div>`
      ))
      .join("");

    document.querySelectorAll(".register-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        alert(`Registrado al evento ${btn.dataset.eventId}`);
      });
    });
  });
}