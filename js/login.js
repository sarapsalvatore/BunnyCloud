document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginButton = document.getElementById("loginButton");
  const errorMessage = document.getElementById("errorMessage");

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add("show");
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 4000);
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (!email || !password) {
      showError("❌ Prosím vyplň všetky polia!");
      return;
    }

    if (!isValidEmail(email)) {
      showError("❌ Prosím zadaj platnú emailovú adresu.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("bunnycloud_users") || "[]");
    const user = existingUsers.find((u) => u.email === email);

    if (!user) {
      showError("❌ Tento email nie je zaregistrovaný.");
      return;
    }

    if (user.password !== password) {
      showError("❌ Nesprávne heslo.");
      return;
    }

    localStorage.setItem("bunnycloud_currentUser", JSON.stringify(user));
    localStorage.setItem("bunnycloud_username", user.username);
    localStorage.setItem("bunnycloud_loggedIn", "true");

    loginButton.textContent = "Prihlásený!";
    loginButton.style.opacity = "0.8";
    loginButton.style.transform = "scale(0.97)";

    setTimeout(() => {
      window.location.href = "bunny-creator.html";
    }, 800);
  });
});
