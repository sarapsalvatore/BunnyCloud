document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const submitButton = document.getElementById("submitButton");
  const errorMessage = document.getElementById("errorMessage");

  // Validácia emailu
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Zobrazenie error správy
  function showError(message, allowHtml = false) {
    if (allowHtml) {
      errorMessage.innerHTML = message;
    } else {
      errorMessage.textContent = message;
    }
    errorMessage.classList.add("show");
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 4000);
  }

  // Odsúť veľkých písichna v passworde (minimálne 6 znakov, minimálne 1 veľké písmeno)
  function isStrongPassword(password) {
    return password.length >= 6;
  }

  // Validácia formulára
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validácie
    if (!username || !email || !password || !confirmPassword) {
      showError("❌ Prosím vyplň všetky polia!");
      return;
    }

    if (username.length < 3) {
      showError("❌ Meno musí mať minimálne 3 znaky.");
      return;
    }

    if (!isValidEmail(email)) {
      showError("❌ Prosím zadaj platnú emailovú adresu.");
      return;
    }

    if (!isStrongPassword(password)) {
      showError("❌ Heslo musí mať minimálne 6 znakov.");
      return;
    }

    if (password !== confirmPassword) {
      showError("❌ Heslá sa nezhodujú!");
      return;
    }

    // Kontrola či účet už existuje
    const existingUsers = JSON.parse(localStorage.getItem("bunnycloud_users") || "[]");
    if (existingUsers.some((u) => u.email === email)) {
      showError(
        '❌ Tento email je už registrovaný! <a href="login.html">Prihlás sa sem</a>.',
        true,
      );
      return;
    }

    // Všetko je OK - uloženie údajov
    const newUser = {
      id: Date.now(),
      username: username,
      email: email,
      password: password, // TODO: Hashuj v produkcii!
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(newUser);
    localStorage.setItem("bunnycloud_users", JSON.stringify(existingUsers));
    localStorage.setItem("bunnycloud_currentUser", JSON.stringify(newUser));
    localStorage.setItem("bunnycloud_username", username);
    localStorage.setItem("bunnycloud_loggedIn", "true");

    // Animácia a presmerovanie
    submitButton.style.transform = "scale(0.96)";
    submitButton.textContent = "✓ Registrácia úspešná!";
    submitButton.style.opacity = "0.7";

    setTimeout(() => {
      window.location.href = "bunny-creator.html";
    }, 1000);
  });

  // Login link handler
  window.goToLogin = function () {
    window.location.href = "login.html";
  };
});

