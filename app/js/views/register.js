import { getData, createData } from "../API/API.js";
import { router } from "../routes.js";

export async function registerView(container) {
  container.innerHTML = `
 <section class="section init-section">
        <div class="register-page container">
            <div class="register-container columns is-centered">
                <div class="columns is-centered">
                    <div class="register-box">
                        <h2 class="form-title title">Create your account</h2>
                        <form id="registerForm">
                            <div class="field">
                                <label class="label" for="name" class="form-label">Full Name</label>
                                <input class="input" type="text" class="form-control" id="name" placeholder="Enter your full name" required>
                            </div>
                            <div class="field">
                                <label class="label" for="email" class="form-label">Email</label>
                                <input class="input" type="email" class="form-control" id="email" placeholder="Enter your email" required>
                            </div>
                            <div class="field">
                                <label class="label" for="password" class="form-label">Password</label>
                                <input class="input" type="password" class="form-control" id="password" placeholder="Create a password" required>
                            </div>
                            <div class="title">
                                <label class="label" for="confirmPassword" class="form-label">Confirm your password</label>
                                <input class="input" type="password" class="form-control" id="confirmPassword" placeholder="Confirm your password" required>
                            </div>
                            <div id="registerError" class="alert alert-danger d-none"></div>
                            <button class="button is-link is-large is-fullwidth" type="submit" class="btn btn-primary w-100 field" id="registerBtn">Register</button>
                            <div class="bottom-link">
                                Already have an account? <a href="#/login" data-link="login">Sign in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

  const form = document.getElementById("registerForm");
  const errorDiv = document.getElementById("registerError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      errorDiv.textContent = "Passwords do not match";
      errorDiv.classList.remove("d-none");
      return;
    }

    try {
      const existingUsers = await getData("users");
      const emailExists = existingUsers.some((u) => u.email === email);

      if (emailExists) {
        errorDiv.textContent = "This email is already registered";
        errorDiv.classList.remove("d-none");
        return;
      }

      const newUser = {
        name,
        email,
        password,
        rol: "visitor",
      };

      await createData("users", newUser);
      window.location.hash = "#/login";
      router();
    } catch (error) {
      console.error("Error registering user:", error);
      errorDiv.textContent =
        "There was a problem registering. Please try again.";
      errorDiv.classList.remove("d-none");
    }
  });
}
