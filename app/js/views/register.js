export function registerView(container) { 
  container.innerHTML =`
    <div class="register-page">
        <div class="register-container">
            <div class="form-box d-flex flex-column flex-md-row align-items-center justify-content-between gap-5">
                <div class="col-md-6">
                    <h2 class="form-title mb-4">Create your account</h2>
                    <form id="registerForm">
                        <div class="mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter your full name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter your email" required>
                        </div>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="Choose a username" required>
                        </div>
                        <div class="mb-4">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Create a password" required>
                        </div>
                        <div id="registerError" class="alert alert-danger d-none"></div>
                        <button type="submit" class="btn btn-primary w-100 mb-3" id="registerBtn">
                            <span class="btn-text">Register</span>
                            <span class="btn-loading d-none">
                                <span class="spinner-border spinner-border-sm me-2"></span>
                                Creating account...
                            </span>
                        </button>
                        <div class="bottom-link">
                            Already have an account? <a href="#/login" data-link="login">Sign in</a>
                        </div>
                    </form>
                </div>
                <div class="col-md-6 text-center">
                    <img src="./scr/assets/images/image-register.png" alt="Sticky note" class="register-img">
                </div>
            </div>
        </div>
    </div>`;
}