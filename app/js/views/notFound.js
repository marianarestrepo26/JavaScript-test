export default function notFound(container) {
    container.innerHTML = `
    <div>
      <h1>404 - Page not found</h1>
      <div>The page you are looking for does not exist or you do not have permission to view it.</div>
      <a href="/login" data-link="login">Return to login</a>
    </div>`
}