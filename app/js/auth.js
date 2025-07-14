export function isAuthenticated() {
    return !! localStorage.getItem('user');
}

export function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function loginUser(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
}

export function logoutUser() {
    localStorage.removeItem('user');
    window.history.pushState({}, '', '/login');
    location.reload()
}