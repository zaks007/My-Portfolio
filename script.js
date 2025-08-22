// Register new user
function doRegister() {
  let name = document.getElementById("regName").value;
  let email = document.getElementById("regEmail").value;
  let password = document.getElementById("regPassword").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (localStorage.getItem("user_" + email)) {
    alert("Account already exists, please login.");
    return;
  }

  localStorage.setItem("user_" + email, JSON.stringify({ name, email, password }));
  alert("Account created successfully! You can now login.");
}

// Login user
function doLogin() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let storedUser = localStorage.getItem("user_" + email);
  if (!storedUser) {
    alert("No account found. Please register first.");
    return;
  }

  let userData = JSON.parse(storedUser);
  if (userData.password === password) {
    alert("Welcome back, " + userData.name + "!");
    localStorage.setItem("loggedInUser", email);
    updateNavbar();
    document.getElementById("authForms").innerHTML =
      "<p>You are logged in as <b>" + userData.name + "</b></p>" +
      "<button class='btn btn-danger w-100 mt-3' onclick='doLogout()'>Logout</button>";
  } else {
    alert("Incorrect password.");
  }
}

// Logout user
function doLogout() {
  localStorage.removeItem("loggedInUser");
  updateNavbar();
  document.getElementById("authForms").innerHTML = `
    <div id="registerForm">
      <input type="text" id="regName" class="form-control mb-2" placeholder="Name" required>
      <input type="email" id="regEmail" class="form-control mb-2" placeholder="Email" required>
      <input type="password" id="regPassword" class="form-control mb-2" placeholder="Password" required>
      <button class="btn btn-primary w-100" onclick="doRegister()">Register</button>
    </div>
    <div id="loginForm" class="mt-3">
      <input type="email" id="loginEmail" class="form-control mb-2" placeholder="Email" required>
      <input type="password" id="loginPassword" class="form-control mb-2" placeholder="Password" required>
      <button class="btn btn-success w-100" onclick="doLogin()">Login</button>
    </div>
  `;
}

// Update Navbar when logged in/out
function updateNavbar() {
  let loggedInUser = localStorage.getItem("loggedInUser");
  let authLink = document.getElementById("authLink");

  if (loggedInUser) {
    let userData = JSON.parse(localStorage.getItem("user_" + loggedInUser));
    authLink.textContent = userData.name;
    authLink.removeAttribute("data-bs-toggle"); // disable modal
    authLink.removeAttribute("data-bs-target");
    authLink.onclick = () => {
      document.getElementById("authForms").innerHTML =
        "<p>You are logged in as <b>" + userData.name + "</b></p>" +
        "<button class='btn btn-danger w-100 mt-3' onclick='doLogout()'>Logout</button>";
      new bootstrap.Modal(document.getElementById("authModal")).show();
    };
  } else {
    authLink.textContent = "Login";
    authLink.setAttribute("data-bs-toggle", "modal");
    authLink.setAttribute("data-bs-target", "#authModal");
    authLink.onclick = null;
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateNavbar);
