export function enrollmentsView(container) { 
  container.innerHTML =`
    <div class="enrollments">
      <section class="nav">
        <div class="nav-left">
          <ul>
            <li><a href="#/dashboard/events/enrollments" data-link="enrollments">Enrollments</a></li>
            <li><a href="#/" data-link="dashboard">Events</a></li>
            <li><a href="#/login" data-link="login">Logout</a></li>
          </ul>
        </div>
        <div class="nav-right">
          <ul>
            <li><a href="#">Bloh</a></li>
            <li><a href="#">Bloh</a></li>
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
      </section>`;
}