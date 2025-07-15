import dashboardView from "./views/dashboard.js";
import { loginView } from "./views/login.js";
import { registerView} from "./views/register.js";
import { editorView, createView} from "./views/editorEvents.js";
import { enrollmentsView } from "./views/enrollments.js";
import notFound from "./views/notFound.js";

import { isAuthenticated } from "./auth.js";

const routes = {
'#/': dashboardView,
'#/login': loginView,
'#/register': registerView,
'#/dashboard/events/edit': editorView,
'#/dashboard/events/create': createView,
'#/dashboard/events/enrollments': enrollmentsView,
'#/not-found': notFound,
};

export function router() {
const path = window.location.hash || '#/';
const mainContent = document.getElementById('main-content');
const view = routes[path];

const protectedRoutes = [
'#/',
'#/dashboard/events/create',
'#/dashboard/events/edit',
'#/dashboard/events/enrollments',
];

if (protectedRoutes.includes(path) && !isAuthenticated()) {
window.location.hash = '#/not-found';
return;
}

if ((path === '#/login' || path === '#/register') && isAuthenticated()) {
window.location.hash = '#/';
return;
}

if (view) {
view(mainContent);
} else {
window.location.hash = '#/not-found';
}
}

window.addEventListener('popstate', router);