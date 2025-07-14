export function loginView(container) { 
  container.innerHTML = `
    <div class="login-page">
        <div class="login-wrapper">
            <div class="login-box">
                <h2 class="mb-4">Welcome back</h2>
                <form id="loginForm">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="loginEmail" placeholder="Email or username" required>
                    </div>
                    <div class="mb-4">
                        <input type="password" class="form-control" id="loginPassword" placeholder="Password" required>
                    </div>
                    <div id="loginError" class="alert alert-danger d-none"></div>
                    <button type="submit" class="btn btn-primary w-100 mb-3" id="loginBtn">
                        <span class="btn-text">Sign In</span>
                        <span class="btn-loading d-none">
                            <span class="spinner-border spinner-border-sm me-2"></span>
                            Signing in...
                        </span>
                    </button>
                    <div class="bottom-link">
                        Don't have an account? <a href="#/register" data-link="register">Register</a>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
}