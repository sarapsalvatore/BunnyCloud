document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const introScreen = document.getElementById("intro-screen");
  const startButton = document.getElementById("startButton");

  // Po 2.5 sekundách schováme splash screen a ukážeme intro
  setTimeout(() => {
    splashScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
  }, 2500);

  // Akcia na tlačidlo
  startButton.addEventListener("click", () => {
    startButton.style.transform = "scale(.96)";
    startButton.style.opacity = ".85";

    setTimeout(() => {
      window.location.href = "pages/register.html";
    }, 250);
  });
});
