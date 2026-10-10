// --- COMPLETE BUNNYCLOUD SMOOF INDICATOR ENGINE ---

document.addEventListener("DOMContentLoaded", function () {
  // 1. Automaticky nájdeme menu a vytvoríme v ňom pohyblivý rámček
  const navMenu = document.querySelector(".nav-menu");
  if (!navMenu) return;

  // Ak už náhodou indikátor existuje, nevytvárame nový
  let indicator = document.querySelector(".nav-indicator");
  if (!indicator) {
    indicator = document.createElement("div");
    indicator.className = "nav-indicator";
    // Vložíme ho na začiatok menu
    navMenu.insertBefore(indicator, navMenu.firstChild);
  }

  const navBtns = document.querySelectorAll(".nav-btn");

  // 2. Funkcia na plynulý výpočet pozície a presun
  function updateIndicator(activeBtn, immediate = false) {
    if (!activeBtn || !indicator) return;

    const menuRect = navMenu.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    // Presný výpočet, kde sa tlačidlo nachádza voči menu
    const topPosition = btnRect.top - menuRect.top + navMenu.scrollTop;

    // Prvé načítanie skočí hneď (immediate), klikanie ide ultra hladko (smoof)
    if (immediate) {
      indicator.style.transition = "none";
    } else {
      indicator.style.transition =
        "transform 0.38s cubic-bezier(0.25, 1, 0.2, 1), height 0.38s cubic-bezier(0.25, 1, 0.2, 1), background-color 0.3s ease";
    }

    // Posun a nastavenie výšky rámčeka
    indicator.style.transform = `translateY(${topPosition}px)`;
    indicator.style.height = `${btnRect.height}px`;

    // Dynamic overenie farby podľa nálady (mood)
    if (
      document.body.classList.contains("mood-original") ||
      !document.body.className.includes("mood-")
    ) {
      indicator.style.backgroundColor = "#f0a32f"; // Tvoja ikonická oranžová
    } else {
      indicator.style.backgroundColor = "#f0a32f"; // Udrží farbu aj v iných módoch, ak si želáš
    }
  }

  // 3. BOD 1: Okamžité nastavenie na aktívne tlačidlo (Home) hneď pri zapnutí appky
  const initialActive = document.querySelector(".nav-btn.active");
  if (initialActive) {
    updateIndicator(initialActive, true);
    // Poistka pre istotu, keby sa ikony načítali o stotinu sekundy neskôr
    setTimeout(() => updateIndicator(initialActive), 50);
  }

  // 4. BOD 2: Sledovanie klikania na VŠETKY tlačidlá a spustenie smoof pohybu
  navBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      navBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      updateIndicator(this);
    });
  });

  // Poistka, aby sa rámček nepokazil, ak zmeníš veľkosť okna prehliadača
  window.addEventListener("resize", () => {
    const currentActive = document.querySelector(".nav-btn.active");
    if (currentActive) updateIndicator(currentActive, true);
  });
});
