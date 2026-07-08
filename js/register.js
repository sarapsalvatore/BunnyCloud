document.addEventListener("DOMContentLoaded", () => {
  const registerTitle = document.getElementById("registerTitle");
  const registerSubtitle = document.getElementById("registerSubtitle");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitButton = document.getElementById("submitButton");

  // Kontrola localStorage
  const uzTuBol = localStorage.getItem("bunnycloud_registrovaný");
  const ulozeneMeno = localStorage.getItem("bunnycloud_meno");

  if (uzTuBol === "true") {
    // Používateľ sa vracia
    registerTitle.textContent = "Welcome back";
    registerSubtitle.textContent = `Nice to see you again, ${ulozeneMeno || "Bunny"}. Please log in.`;
    submitButton.textContent = "Log In";

    if (ulozeneMeno) {
      usernameInput.value = ulozeneMeno;
    }
  } else {
    // Nový používateľ
    registerTitle.textContent = "Hi newbie";
    registerSubtitle.textContent =
      "Create your first cute account on Bunnycloud.";
    submitButton.textContent = "Sign Up";
  }

  // Kliknutie na tlačidlo
  submitButton.addEventListener("click", () => {
    const meno = usernameInput.value.trim();
    const heslo = passwordInput.value.trim();

    if (meno === "" || heslo === "") {
      alert("Please fill in your username and password.");
      return;
    }

    // Uloženie údajov
    localStorage.setItem("bunnycloud_registrovaný", "true");
    localStorage.setItem("bunnycloud_meno", meno);

    submitButton.style.transform = "scale(0.96)";

    setTimeout(() => {
      // Presmerovanie na tvorbu avatara bez vyskakujúceho okna
      window.location.href = "bunny-creator.html";
    }, 200);
  });
});
