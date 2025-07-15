import { getData, deleteData } from "../API/API.js";
import { router } from "../routes.js";
import { layoutWrapper } from "../components/layout.js";

export default function dashboardView(container) {
  const user = getUser();

  container.innerHTML = layoutWrapper`
    <div class="columns is-gapless" style="height: 100vh;">
      <aside class="column is-2 has-background-light p-4">
        <nav class="menu">
          <ul class="menu-list">
            <li><a href="#/" data-link="dashboard">Events</a></li>
            ${user.role === "visitor" ? '<li><a href="#/dashboard/events/enrollments" data-link="enrollments">Enrollments</a></li>' : ""}
            <li><a href="#/login" data-link="login" id="logout">Logout</a></li>
          </ul>
        </nav>
      </aside>

      <main class="column p-5">
        <div class="level">
          <h1 class="title is-3">Events</h1>
          ${user.role === "admin" ? `
            <div class="level-right">
              <button class="button is-primary" id="newEventBtn">Add New Event</button>
            </div>` : ""
          }
        </div>
        <div id="eventsList" class="columns is-multiline"></div>
      </main>
    </div>
  `;

  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    logoutUser();
  });

  if (user.role === "admin") {
    const btn = document.getElementById("newEventBtn");
    btn.addEventListener("click", () => {
      localStorage.removeItem("eventEdit");
      window.location.hash = "#/dashboard/events/form";
      router();
    });
  }

  const eventsList = document.getElementById("eventsList");

  getData("events")
    .then((events) => {
      eventsList.innerHTML = events.map((event) => {
        let actionButtons = "";

        if (user.role === "admin") {
          actionButtons = `
            <div class="buttons mt-3">
              <button class="button is-info is-small edit-btn" data-event='${JSON.stringify(event)}'>Edit</button>
              <button class="button is-danger is-small delete-btn" data-id="${event.id}">Delete</button>
            </div>
          `;
        } else if (user.role === "visitor") {
          actionButtons = `
            <div class="mt-3">
              <button class="button is-link is-small enroll-btn" data-event='${JSON.stringify(event)}'>Enroll</button>
            </div>
          `;
        }

        return `
          <div class="column is-4">
            <div class="box">
              <h3 class="title is-5">${event.name}</h3>
              <p>${event.description}</p>
              <p><strong>Date:</strong> ${event.date}</p>
              <p><strong>Capacity:</strong> ${event.capacity}</p>
              ${actionButtons}
            </div>
          </div>
        `;
      }).join("");

      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const eventData = JSON.parse(btn.dataset.event);
          localStorage.setItem("eventEdit", JSON.stringify(eventData));
          window.location.hash = "#/dashboard/events/form";
          router();
        });
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          if (confirm("Are you sure you want to delete this event?")) {
            try {
              await deleteData("events", id);
              router();
            } catch {
              alert("Error deleting event.");
            }
          }
        });
      });

      document.querySelectorAll(".enroll-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const event = JSON.parse(btn.dataset.event);
          alert(`You enrolled in: ${event.name}`);
          // Aquí puedes guardar en "enrollments" si lo implementas luego
        });
      });
    })
    .catch(() => {
      eventsList.innerHTML = `<p class="has-text-danger">Error loading events</p>`;
    });
}