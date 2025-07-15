import { getData } from "../API/API.js";
import { layoutWrapper } from "../components/layout.js";

export function enrollmentsView(container) {
  const user = getUser();

  if (user.rol !== "visitor") {
    container.innerHTML = layoutWrapper("<p>You don't have access to this section.</p>", false);
    return;
  }

  Promise.all([
    getData("enrollments"),
    getData("events")
  ]).then(([enrollments, events]) => {
    const userEnrollments = enrollments.filter(e => e.userId === user.id);

    const content = userEnrollments
      .map((enrollment) => {
        const event = events.find(ev => ev.id == enrollment.eventId);
        return `
          <div class="box">
            <h4 class="title is-5">${event?.name || 'Event not found'}</h4>
            <p>${event?.description || ''}</p>
            <p><strong>Date:</strong> ${event?.date}</p>
          </div>`;
      })
      .join("");

    container.innerHTML = layoutWrapper(`
      <section>
        <h2 class="title is-4">My Enrollments</h2>
        ${content || "<p>You are not enrolled in any events.</p>"}
      </section>
    `);
  });
}