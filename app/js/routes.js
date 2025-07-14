import dashboardView from "./views/dashboard";
import loginView from "./views/login";
import registerView from "./views/register";
import {editorView , createView} from "./views/editorEvents";
import enrollmentsView from "./views/enrollments";
import notFound from "./views/notFound";

import { isAuthenticated } from "./auth"

const routes = {
    '#/' : dashboardView(),
    '#/login' : loginView(),
    '#/register' : registerView(),
    '#/dashboard/events/edit' : editorView(),
    '#/dashboard/events/create' : createView(),
    '#/enrollments' : enrollmentsView(),
};

export function router() {
    const path = window.location.hash || '#/';
    const mainContent = document.getElementById('main-content');
    const view = routes[path];

    const protectedRoutes = ['/', '/dashboard/events/create', '/dashboard/events/edit', '/enrollments']

    if (protectedRoutes.includes(path) && !isAuthenticated()) {
        history.pushState({}, '' , '/not-found');
        notFound(mainContent);
        return;
    }

    if ((path === '/login' || path === '/register') && isAuthenticated()) {
        history.pushState({}, '', '/');
        dashboardView(mainContent);
        return;
    }

    if(view) {
        view(mainContent);
    } else {
        history.pushState({}, '', '/not-found');
        notFound(mainContent);
    }
}

window.addEventListener('popstate', router);