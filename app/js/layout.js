  export function layoutWrapper(content, showEnrollments = true) {
  const user = JSON.parse(localStorage.getItem('user'));

  return `
    <div class="columns is-gapless" style="min-height: 100vh;">
      <aside class="column is-2 has-background-dark">
        <div class="menu p-4">
          <figure class="image is-96x96 mb-4">
            <img class="is-rounded" src="https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}" />
          </figure>
          <ul class="menu-list">
            <li><a class="has-text-white" href="#/">Events</a></li>
            ${user.rol === "visitor" && showEnrollments ? `<li><a class="has-text-white" href="#/dashboard/events/enrollments">Enrollments</a></li>` : ''}
            <li><a id="logout" class="has-text-white" href="#">Logout</a></li>
          </ul>
        </div>
      </aside>
      <main class="column p-5">
        ${content}
      </main>
    </div>
  `;
  }