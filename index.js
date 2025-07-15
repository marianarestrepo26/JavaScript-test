import { router } from "./app/js/routes.js";

window.addEventListener('DOMContentLoaded', router);

document.addEventListener('click', (evt) => {
if (evt.target.matches('a[data-link]')) {
evt.preventDefault();
const path = evt.target.getAttribute('href');
window.location.hash = path;
router();
}
});