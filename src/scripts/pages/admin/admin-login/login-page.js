export default class AdminLoginPage {

  async render() {
    return `
        <section class="admin-login-section">
            <div class="login-split-container">
                <div class="login-left-panel">
                    <div class="login-header-left">
                        <img src="images/logo.png" alt="PilahCerdas Logo" class="logo-admin">
                        <h5 class="admin-title">ADMIN LOGIN</h5>
                    </div>
                    <div class="login-content-box">
                        <h2 class="welcome-heading">WELCOME BACK</h2>
                        <p class="welcome-subheading">Welcome back! Please enter your details.</p>
                        <form id="admin-login-form"> <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter admin username" class="input-field-admin" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <div class="password-input-wrapper">
                                    <input type="password" id="password" name="password" placeholder="********" class="input-field-admin" required>
                                    <button type="button" id="toggle-password" class="toggle-eye-button">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <button type="submit" class="sign-in-btn">Sign in</button>
                            <p id="login-error-message" class="error-message"></p>
                        </form>
                    </div>
                </div>
                <div class="login-right-panel">
                    <img src="images/admin-illustration.jpg" alt="Admin Illustration" class="illustration-admin">
                </div>
            </div>
        </section>
    `;
  }

  async afterRender() {
    console.log("Admin Login Page afterRender called!");
    const loginForm = document.getElementById("admin-login-form");
    const errorMessageElement = document.getElementById("login-error-message");
    const togglePassword = document.querySelector("#toggle-password");
    const passwordInput = document.querySelector("#password");

    togglePassword?.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      togglePassword.innerHTML =
        type === "password"
          ? '<i class="fa-solid fa-eye"></i>'
          : '<i class="fa-solid fa-eye-slash"></i>';
    });

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); 

      const username = loginForm.elements.username.value;
      const password = loginForm.elements.password.value;

      errorMessageElement.textContent = ""; 

      try {
        const response = await fetch("http://localhost:9000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const responseData = await response.json();

        if (response.ok) {
          console.log("Login berhasil:", responseData.message);
          console.log('Token dari backend:', responseData.data.token);
          localStorage.setItem("adminToken", responseData.data.token);
          console.log('Token setelah disimpan di localStorage:', localStorage.getItem('adminToken'));
          window.location.hash = "/admin/dashboard"; 
        } else {
          console.error("Login gagal:", responseData.message);
          errorMessageElement.textContent =
            responseData.message || "Username atau password salah.";
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat melakukan request login:", error);
        errorMessageElement.textContent =
          "Terjadi kesalahan jaringan atau server. Silakan coba lagi.";
      }
    });
  }
}
