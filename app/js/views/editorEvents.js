import { router } from "../routes.js";

export function formEventView(container) {
  const eventToEdit = JSON.parse(localStorage.getItem("eventEdit")) || null;
  const isEditing = !!eventToEdit;

  container.innerHTML = `
    <div class="columns is-gapless" style="height: 100vh;">
      <aside class="column is-2 has-background-light p-4">
        <nav class="menu">
          <ul class="menu-list">
            <li><a href="#/" data-link="dashboard">Events</a></li>
            ${getUser().role === 'visitor' ? '<li><a href="#/dashboard/events/enrollments" data-link="enrollments">Enrollments</a></li>' : ''}
            <li><a href="#/login" data-link="login" id="logout">Logout</a></li>
          </ul>
        </nav>
      </aside>

      <main class="column p-5">
        <h2 class="title is-4">${isEditing ? 'Edit Event' : 'Create Event'}</h2>
        <form id="eventForm" class="box">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" id="name-event" value="${eventToEdit?.name || ''}" required>
            </div>
          </div>
          
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input class="input" type="text" id="description-event" value="${eventToEdit?.description || ''}" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input class="input" type="date" id="date-event" value="${eventToEdit?.date || ''}" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Capacity</label>
            <div class="control">
              <input class="input" type="number" id="capacity-event" value="${eventToEdit?.capacity || ''}" required>
            </div>
          </div>

          <div class="field is-grouped mt-5">
            <div class="control">
              <button class="button is-link" type="submit">${isEditing ? 'Update' : 'Create'}</button>
            </div>
            <div class="control">
              <button class="button is-light" type="button" id="cancel">Cancel</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  `;

  document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();
    logoutUser();
  });

  document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const newEvent = {
      name: document.getElementById("name-event").value.trim(),
      description: document.getElementById("description-event").value.trim(),
      date: document.getElementById("date-event").value,
      capacity: parseInt(document.getElementById("capacity-event").value)
    };

    try {
      if (isEditing) {
        await updateData("events", newEvent, eventToEdit.id);
      } else {
        await createData("events", newEvent);
      }

      localStorage.removeItem("eventEdit");
      window.location.hash = "#/";
      router();
    } catch (error) {
      alert("Error saving event");
    }
  });

  document.getElementById("cancel").addEventListener("click", () => {
    localStorage.removeItem("eventEdit");
    window.location.hash = "#/";
    router();
  });
}