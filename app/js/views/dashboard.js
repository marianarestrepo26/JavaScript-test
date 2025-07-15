import { getUser, logoutUser } from "../auth.js";
import { getData } from "../API/API.js";

export default function dashboardView(container) {
  const user = getUser();

  container.innerHTML = `    
    <div class="dashboard">
      <section class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
            <div class="navbar-start">
                <ul>
                    <img src=https://api.dicebear.com/9.x/avataaars/svg?seed={username}" alt="Avatar">
                    <li><a class="navbar-item" href="#/" data-link="dashboard">Events</a></li>
                    <li><a class="navbar-item" href="#/dashboard/events/enrollments" data-link="enrollments">Enrollments</a></li>
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
        .map((event) => {
          const editButton =
            user.role === "admin"
              ? `<button class="edit-btn" data-event='${JSON.stringify(
                  event
                )}'>Editar</button>`
              : "";

          return `
            <div class="event">
              <h3>${event.name}</h3> <p>${event.description}</p>
              <p>${event.date}</p> <p>${event.capacity}</p>
              ${editButton}
            </div>`;
        })
        .join("");

      // Agregar funcionalidad al botón de editar
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const eventData = JSON.parse(btn.dataset.event);
          localStorage.setItem("eventoAEditar", JSON.stringify(eventData));
          window.location.hash = "#/editorView";
        });
      });
    })
    .catch(() => {
      eventsList.textContent = "Error cargando eventos";
    });
}
