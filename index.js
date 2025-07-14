import {routes} from "./app/js/routes.js";

window.addEventListener('DOMContentLoaded', routes());

document.addEventListener('click', (evt) => {
  if (evt.target.matches('a[data-link]')){
    evt.preventDefault();
    const path = evt.target.getAttribute('href');
    history.pushState({}, '', path);
    routes();
  }
})
