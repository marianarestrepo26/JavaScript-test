import { getData } from "../API/API.js";
import { loginUser } from "../auth.js";
import { router } from "../routes.js";

export function loginView(container) {
  container.innerHTML = `
    <section class="section init-section">
        <div class="container login-container">
            <div class="login-page columns is-centered">
                <div class="login-wrapper column is-half">
                    <div class="login-box">
                        <h2 class="title">Welcome back</h2>
                        <form id="loginForm">
                            <div class="field">
                                <label class="label" for="loginEmail">Email</label>
                                <input class="input" type="text" class="form-control" id="loginEmail" required>
                            </div>
                            <div class="field">
                                <label class="label" for="loginPassword">Password</label>
                                <input class="input" type="password" class="form-control" id="loginPassword" required>
                            </div>
                            <div id="loginError" class="alert alert-danger d-none"></div>
                            <button class="button is-link is-large is-fullwidth" type="submit" class="btn btn-primary w-100 mb-3" id="loginBtn">Sign In</button>
                            <div class="bottom-link">
                                Don't have an account? <a href="#/register" data-link="register">Register</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("loginError");

  console.log(form);
  

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.loginEmail.value;
    console.log(email);
    
    const password = form.loginPassword.value;
    console.log(password)

    try {
      const users = await getData('users');
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        loginUser(user);
        window.location.hash = "#/";
        router();
      } else {
        errorDiv.textContent = "Incorrect username or password";
      }
    } catch (error) {
      errorDiv.textContent = "Login error";
    }
  });
}
