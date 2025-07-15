import { createData } from '../API/API.js';
import { router } from "../routes.js";

export function editorView(container) {
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
        <div class="input-event">
            <label for="name-event">Name</label>
            <input type="text" name="name-event" id="name-event">
            
            <label for="description-event">description</label>
            <input type="text" name="description-event" id="description-event">
            
            <label for="date-event">description</label>
            <input type="date" name="date-event" id="date-event">
            
            <label for="capacity-event">description</label>
            <input type="number" name="capacity-event" id="capacity-event">
        </div>
        <div class="btns-create">
            <button type="button" id="cancel">cancel</button>
            <button type="button" id="save">save</button>
        </div>
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
      await createData("events", newEvent);
      window.location.hash = "#/";
      router();
    } catch {
      alert("Error al crear el evento");
    }
  });
}

export function createView(container) {
  container.innerHTML = `
    <div class="create">
        <div class="input-event">
            <label for="name-event">Name</label>
            <input type="text" name="name-event" id="name-event">
            
            <label for="description-event">description</label>
            <input type="text" name="description-event" id="description-event">
            
            <label for="date-event">description</label>
            <input type="date" name="date-event" id="date-event">
            
            <label for="capacity-event">description</label>
            <input type="number" name="capacity-event" id="capacity-event">
        </div>
        <div class="btns-create">
            <button type="button" id="cancel">cancel</button>
            <button type="button" id="save">save</button>
        </div>
    </div>`;
}
