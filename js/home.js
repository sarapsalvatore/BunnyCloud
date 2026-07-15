document.addEventListener("DOMContentLoaded", () => {
  // 1. NAČÍTANIE MENA Z LOCALSTORAGE (Sarka)
  let savedName = "Sarka";
  try {
    const savedUser = JSON.parse(
      localStorage.getItem("bunnycloud_currentUser") || "{}",
    );
    savedName =
      savedUser.username ||
      localStorage.getItem("bunnycloud_username") ||
      localStorage.getItem("username") ||
      savedName;
  } catch (error) {
    savedName = "Sarka";
  }

  // Zápis mena v malých písmenách do spodného profilu
  const profileName = document.getElementById("userProfileName");
  if (profileName) profileName.textContent = savedName.toLowerCase();

  // Priradenie uloženého avatara na miesta králička (VYRADILI SME ODTIETO #sidebarBunny)
  let savedBunny = {};
  try {
    savedBunny = JSON.parse(localStorage.getItem("bunnycloud_bunny") || "{}");
  } catch (e) {
    savedBunny = {};
  }

  const avatarSrc = savedBunny.avatarUrl || "../images/bunny-base.svg";

  // Teraz meníme len tie obrázky, ktoré sa majú dynamicky meniť (vynechali sme sidebar)
  const bunnyImages = document.querySelectorAll(
    "#heroBunny, #roomBunny, .mini-bunny-avatar img",
  );
  bunnyImages.forEach((img) => {
    if (img) img.src = avatarSrc;
  });

  // Inicializácia pozdravu v Hero sekcii
  updateHeroGreeting();

  // Nastavenie počiatočnej nálady (Rain)
  changeMood("rain");

  // 2. LOGIKA ČASOVAČA PREHRÁVAČA (1:24 -> 3:45)
  const playBtn = document.getElementById("mainPlayBtn");
  const progressFill = document.getElementById("playerProgress");
  const currentTimeText = document.getElementById("currentTime");

  let isPlaying = false;
  let timerInterval;
  let currentSeconds = 84;
  const totalSeconds = 225;

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      const icon = playBtn.querySelector("i");

      if (isPlaying) {
        if (icon) icon.setAttribute("data-lucide", "play");
        clearInterval(timerInterval);
      } else {
        if (icon) icon.setAttribute("data-lucide", "pause");
        timerInterval = setInterval(() => {
          if (currentSeconds < totalSeconds) {
            currentSeconds++;
            let mins = Math.floor(currentSeconds / 60);
            let secs = currentSeconds % 60;
            if (secs < 10) secs = "0" + secs;

            if (currentTimeText)
              currentTimeText.textContent = `${mins}:${secs}`;
            if (progressFill) {
              let percentage = (currentSeconds / totalSeconds) * 100;
              progressFill.style.width = `${percentage}%`;
            }
          } else {
            clearInterval(timerInterval);
          }
        }, 1000);
      }
      lucide.createIcons();
    });
  }
});

// 3. OBSAH PODĽA NAVOLENEJ NÁLADY
function changeMood(mood) {
  const songContainer = document.getElementById("suggestedSongs");
  const quote = document.getElementById("moodQuote");

  // Reset aktívnej triedy na všetkých mood kartách
  document
    .querySelectorAll(".mood-card")
    .forEach((card) => card.classList.remove("active"));

  // Aktivácia správneho tlačidla
  const currentBtn = document.querySelector(
    `button[onclick="changeMood('${mood}')"]`,
  );
  if (currentBtn) currentBtn.classList.add("active");

  // Zoznam pesničiek a citátov pre každú náladu
  const moodData = {
    rain: {
      quote: "Rainy days are perfect for cozy, nostalgic beats. ☔",
      songs: `
        <div class="s-card"><div class="s-cover c1"></div><h4>Rainy Nights</h4><p>Lo-fi • 32 songs</p></div>
        <div class="s-card"><div class="s-cover c2"></div><h4>Broken Hearts</h4><p>Sad • 28 songs</p></div>
        <div class="s-card"><div class="s-cover c3"></div><h4>Late Thoughts</h4><p>Chill • 24 songs</p></div>
        <div class="s-card"><div class="s-cover c4"></div><h4>Soft Piano</h4><p>Instrumental • 30 songs</p></div>
      `,
    },
    happy: {
      quote: "Keep smiling and let the music power your day! ☀️",
      songs: `
        <div class="s-card"><div class="s-cover c2"></div><h4>Sunny Beats</h4><p>Pop • 42 songs</p></div>
        <div class="s-card"><div class="s-cover c4"></div><h4>Good Vibe</h4><p>Dance • 18 songs</p></div>
        <div class="s-card"><div class="s-cover c1"></div><h4>Bright Days</h4><p>Indie • 35 songs</p></div>
        <div class="s-card"><div class="s-cover c3"></div><h4>Joy Ride</h4><p>Happy • 20 songs</p></div>
      `,
    },
    calm: {
      quote: "Take a deep breath. Slow down and listen. 🍃",
      songs: `
        <div class="s-card"><div class="s-cover c3"></div><h4>Ocean Mist</h4><p>Ambient • 20 songs</p></div>
        <div class="s-card"><div class="s-cover c1"></div><h4>Green Garden</h4><p>Relax • 15 songs</p></div>
        <div class="s-card"><div class="s-cover c4"></div><h4>Soft Breeze</h4><p>Chill • 22 songs</p></div>
        <div class="s-card"><div class="s-cover c2"></div><h4>Quiet Flow</h4><p>Focus • 30 songs</p></div>
      `,
    },
    dreamy: {
      quote: "Let your mind wander among the stars tonight. ✨",
      songs: `
        <div class="s-card"><div class="s-cover c4"></div><h4>Ethereal Dreams</h4><p>Dreamy • 25 songs</p></div>
        <div class="s-card"><div class="s-cover c3"></div><h4>Neon Stars</h4><p>Synth • 19 songs</p></div>
        <div class="s-card"><div class="s-cover c1"></div><h4>Cloud Nine</h4><p>Ambient • 31 songs</p></div>
        <div class="s-card"><div class="s-cover c2"></div><h4>Velvet Sky</h4><p>Chillwave • 14 songs</p></div>
      `,
    },
    study: {
      quote: "Stay focused. You are doing amazing! 📚",
      songs: `
        <div class="s-card"><div class="s-cover c1"></div><h4>Focus Beats</h4><p>Focus • 50 songs</p></div>
        <div class="s-card"><div class="s-cover c3"></div><h4>Deep Memory</h4><p>Ambient • 24 songs</p></div>
        <div class="s-card"><div class="s-cover c2"></div><h4>Smart Coding</h4><p>Electronic • 40 songs</p></div>
        <div class="s-card"><div class="s-cover c4"></div><h4>Library Space</h4><p>Piano • 18 songs</p></div>
      `,
    },
    gaming: {
      quote: "Level up your focus with these gaming tracks! 🎮",
      songs: `
        <div class="s-card"><div class="s-cover c2"></div><h4>Arcade Runner</h4><p>Chiptune • 27 songs</p></div>
        <div class="s-card"><div class="s-cover c3"></div><h4>Cyber Drive</h4><p>Synthwave • 33 songs</p></div>
        <div class="s-card"><div class="s-cover c1"></div><h4>Power Up</h4><p>EDM • 45 songs</p></div>
        <div class="s-card"><div class="s-cover c4"></div><h4>Final Boss</h4><p>Epic • 21 songs</p></div>
      `,
    },
    love: {
      quote: "Love is in the air, and in every single beat. 💕",
      songs: `
        <div class="s-card"><div class="s-cover c4"></div><h4>Heart Strings</h4><p>Acoustic • 30 songs</p></div>
        <div class="s-card"><div class="s-cover c2"></div><h4>Warm Hugs</h4><p>Chill • 22 songs</p></div>
        <div class="s-card"><div class="s-cover c1"></div><h4>Sweet Symphony</h4><p>Romantic • 19 songs</p></div>
        <div class="s-card"><div class="s-cover c3"></div><h4>Midnight Tales</h4><p>R&B • 26 songs</p></div>
      `,
    },
    sleep: {
      quote: "Close your eyes, relax, and drift away. 🌙",
      songs: `
        <div class="s-card"><div class="s-cover c3"></div><h4>Deep Rest</h4><p>Sleep Sounds • 60 songs</p></div>
        <div class="s-card"><div class="s-cover c1"></div><h4>Star Lullaby</h4><p>Ambient • 18 songs</p></div>
        <div class="s-card"><div class="s-cover c2"></div><h4>Night Light</h4><p>Quiet • 25 songs</p></div>
        <div class="s-card"><div class="s-cover c4"></div><h4>Cloud Bed</h4><p>Relax • 32 songs</p></div>
      `,
    },
  };

  const selected = moodData[mood] || moodData["rain"];

  if (songContainer) songContainer.innerHTML = selected.songs;
  if (quote) quote.textContent = selected.quote;
}

// 4. Funkcia na nastavenie pozdravu podľa času dňa
function updateHeroGreeting() {
  const greetingElement = document.querySelector("#mainHero .hero-text p");
  if (!greetingElement) return;

  const hours = new Date().getHours();
  let greetingText = "Good evening,";

  if (hours >= 5 && hours < 12) {
    greetingText = "Good morning,";
  } else if (hours >= 12 && hours < 18) {
    greetingText = "Good afternoon,";
  } else if (hours >= 18 && hours < 22) {
    greetingText = "Good evening,";
  } else {
    greetingText = "Good night,";
  }

  greetingElement.textContent = greetingText;
}
// Definícia piesní pre sekciu "Made for your mood"
const suggestedSongs = [
  {
    title: "Rainy Nights",
    category: "Lo-fi",
    songsCount: "32 songs",
    coverClass: "c-rainy",
  },
  {
    title: "Broken Hearts",
    category: "Sad",
    songsCount: "28 songs",
    coverClass: "c-broken",
  },
  {
    title: "Late Thoughts",
    category: "Chill",
    songsCount: "24 songs",
    coverClass: "c-late",
  },
  {
    title: "Soft Piano",
    category: "Instrumental",
    songsCount: "30 songs",
    coverClass: "c-soft",
  },
];

// Funkcia na vykreslenie kartičiek do HTML
function renderSuggestedSongs() {
  const container = document.getElementById("suggestedSongs");
  if (!container) return;

  // Vyčistíme kontajner pre istotu
  container.innerHTML = "";

  // Vygenerujeme každú kartičku presne podľa tvojich CSS tried
  suggestedSongs.forEach((song) => {
    const card = document.createElement("div");
    card.className = "s-card"; // Použije tvoje CSS pravidlo pre .s-card

    card.innerHTML = `
      <div class="s-cover ${song.coverClass}"></div>
      <div class="s-card-info">
        <h4>${song.title}</h4>
        <p>${song.category} • ${song.songsCount}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Spustenie funkcie po načítaní stránky
document.addEventListener("DOMContentLoaded", () => {
  renderSuggestedSongs();
});
