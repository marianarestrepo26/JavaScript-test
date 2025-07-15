import { createData } from '../API/API.js';
import { router } from "../routes.js";

export function editorView(container) {
  const eventToEdit = JSON.parse(localStorage.getItem("eventEdit")) || {};

  container.innerHTML = `
    <div class="editor">
      <section class="nav">
        <div class="nav-left">
          <ul>
            <li><a href="#/dashboard/events/enrollments" data-link="enrollments">Enrollments</a></li>
            <li><a href="#/" data-link="dashboard">Events</a></li>
            <li><a href="#/login" data-link="login" id="logout">Logout</a></li>
          </ul>
        </div>  
      </section>
      <section>
        <form id="eventForm">
          <div class="input-event">
              <label for="name-event">Name</label>
              <input type="text" name="name-event" id="name-event" value="${eventToEdit.name || ''}">
              
              <label for="description-event">Description</label>
              <input type="text" name="description-event" id="description-event" value="${eventToEdit.description || ''}">
              
              <label for="date-event">Date</label>
              <input type="date" name="date-event" id="date-event" value="${eventToEdit.date || ''}">
              
              <label for="capacity-event">Capacity</label>
              <input type="number" name="capacity-event" id="capacity-event" value="${eventToEdit.capacity || ''}">
          </div>
          <div class="btns-create">
              <button type="button" id="cancel">Cancel</button>
              <button type="submit" id="save">Save</button>
          </div>
        </form>
      </section>
    </div>`;

  const form = document.getElementById("eventForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newEvent = {
      name: form["name-event"].value,
      description: form["description-event"].value,
      date: form["date-event"].value,
      capacity: parseInt(form["capacity-event"].value),
    };

    try {
      // Si existe un ID, sería una edición, si no, una creación
      if (eventToEdit.id) {
        // Puedes usar tu método updateData aquí si lo tienes
        const response = await fetch(`http://localhost:3000/events/${eventToEdit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newEvent)
        });
        if (!response.ok) throw new Error();
      } else {
        await createData("events", newEvent);
      }

      localStorage.removeItem("eventEdit");
      window.location.hash = "#/";
      router();
    } catch {
      alert("Error al guardar el evento");
    }
  });

  document.getElementById("cancel").addEventListener("click", () => {
    localStorage.removeItem("eventEdit");
    window.location.hash = "#/";
    router();
  });
}

export function createView(container) {
  container.innerHTML = `
    <div class="editor">
      <section class="nav">
        <div class="nav-left">
          <ul>
            <li><a href="#/dashboard/events/enrollments" data-link="enrollments">Enrollments</a></li>
            <li><a href="#/" data-link="dashboard">Events</a></li>
            <li><a href="#/login" data-link="login" id="logout">Logout</a></li>
          </ul>
        </div>  
      </section>
      <section>
        <form id="eventForm">
          <div class="input-event">
              <label for="name-event">Name</label>
              <input type="text" name="name-event" id="name-event" value="${eventToEdit.name || ''}">
              
              <label for="description-event">Description</label>
              <input type="text" name="description-event" id="description-event" value="${eventToEdit.description || ''}">
              
              <label for="date-event">Date</label>
              <input type="date" name="date-event" id="date-event" value="${eventToEdit.date || ''}">
              
              <label for="capacity-event">Capacity</label>
              <input type="number" name="capacity-event" id="capacity-event" value="${eventToEdit.capacity || ''}">
          </div>
          <div class="btns-create">
              <button type="button" id="cancel">Cancel</button>
              <button type="submit" id="save">Save</button>
          </div>
        </form>
      </section>
    </div>`;
}