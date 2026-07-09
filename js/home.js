document.addEventListener("DOMContentLoaded", () => {
  // 1. SPRÁVNE MENO PODĽA VYTVORENÉHO AVATARA
  const savedUser = JSON.parse(localStorage.getItem("bunnycloud_currentUser") || "{}");
  const savedName =
    savedUser.username ||
    localStorage.getItem("bunnycloud_username") ||
    localStorage.getItem("bunnycloud_meno") ||
    localStorage.getItem("username") ||
    "Sarka";

  const savedBunny = JSON.parse(localStorage.getItem("bunnycloud_bunny") || "{}");

  // Prepíšeme texty v HTML, aby ukazovali reálne zadané meno
  const heroGreeting = document.getElementById("heroGreetingName");
  const profileName = document.getElementById("userProfileName");

  if (heroGreeting) heroGreeting.textContent = savedName;
  if (profileName) profileName.textContent = savedName;

  const avatarImgs = document.querySelectorAll(
    "#sidebarBunny, #heroBunny, #roomBunny, .mini-bunny-avatar img",
  );
  const avatarSrc = savedBunny.avatarUrl || "../images/bunny-base.jpg";
  avatarImgs.forEach((img) => {
    if (img) img.src = avatarSrc;
  });

  // Pri štarte nastavíme základnú študijnú náladu
  changeMood("study");

  // 2. OVLÁDANIE PREHRÁVAČA
  const playBtn = document.getElementById("mainPlayBtn");
  const progressFill = document.getElementById("playerProgress");
  const currentTimeText = document.getElementById("currentTime");

  let isPlaying = false;
  let timerInterval;
  let totalSeconds = 84; // Začíname na čase 1:24

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playBtn.textContent = "⏸";
        timerInterval = setInterval(() => {
          totalSeconds++;
          let mins = Math.floor(totalSeconds / 60);
          let secs = totalSeconds % 60;
          if (secs < 10) secs = "0" + secs;

          if (currentTimeText) currentTimeText.textContent = `${mins}:${secs}`;
          if (progressFill) {
            let percent = (totalSeconds / 225) * 100; // Celkový čas 3:45 má 225 sekúnd
            progressFill.style.width = `${percent}%`;
          }
        }, 1000);
      } else {
        playBtn.textContent = "▶";
        clearInterval(timerInterval);
      }
    });
  }
});

// 3. MENIACE SA POZADIE A PLAYLISTY PODĽA NÁLAD (Presne z nákresu)
function changeMood(mood) {
  const body = document.body;
  const hero = document.getElementById("mainHero");
  const quote = document.getElementById("moodQuote");
  const songContainer = document.getElementById("suggestedSongs");

  // Reset aktívnych tried na tlačidlách nálad
  document
    .querySelectorAll(".mood-card")
    .forEach((card) => card.classList.remove("active"));

  const moodConfigs = {
    study: {
      bg: "#f0f6ff",
      hero: "linear-gradient(135deg, #cbdcff 0%, #eef3ff 100%)",
      quote: '"Focus on your dreams, track by track."',
      songs: `
                <div class="s-card"><div class="s-cover c1"></div><h4>Rainy Nights</h4><p>Lo-fi • 32 songs</p></div>
                <div class="s-card"><div class="s-cover c3"></div><h4>Late Thoughts</h4><p>Chill • 24 songs</p></div>
            `,
    },
    happy: {
      bg: "#fffbf0",
      hero: "linear-gradient(135deg, #ffe9b5 0%, #fff7e1 100%)",
      quote: '"Music sounds sweeter when you are smiling!"',
      songs: `
                <div class="s-card"><div class="s-cover c2"></div><h4>Sunny Beats</h4><p>Happy • 40 songs</p></div>
                <div class="s-card"><div class="s-cover c4"></div><h4>Pastel Energy</h4><p>Pop • 18 songs</p></div>
            `,
    },
    calm: {
      bg: "#f0fbf6",
      hero: "linear-gradient(135deg, #c6f3db 0%, #ebfaf2 100%)",
      quote: '"Take a deep breath. Let the frequencies heal you."',
      songs: `
                <div class="s-card"><div class="s-cover c3"></div><h4>Soft Piano</h4><p>Instrumental • 30 songs</p></div>
                <div class="s-card"><div class="s-cover c1"></div><h4>Green Garden</h4><p>Ambient • 15 songs</p></div>
            `,
    },
    dreamy: {
      bg: "#f3ebff",
      hero: "linear-gradient(135deg, #ebd5ff 0%, #f8eaff 100%)",
      quote: '"Let your imagination wander freely."',
      songs: `
                <div class="s-card"><div class="s-cover c3"></div><h4>Ethereal Dreams</h4><p>Ambient • 28 songs</p></div>
                <div class="s-card"><div class="s-cover c1"></div><h4>Cloud Nine</h4><p>Dreamy • 22 songs</p></div>
            `,
    },
    rain: {
      bg: "#f0f9ff",
      hero: "linear-gradient(135deg, #bfeaff 0%, #e3f4ff 100%)",
      quote: '"Find peace in the rhythm of rain."',
      songs: `
                <div class="s-card"><div class="s-cover c4"></div><h4>Rainy Day Vibes</h4><p>Lo-fi • 35 songs</p></div>
                <div class="s-card"><div class="s-cover c1"></div><h4>Soft Rain</h4><p>Ambient • 26 songs</p></div>
            `,
    },
    gaming: {
      bg: "#f5f0ff",
      hero: "linear-gradient(135deg, #e0bfff 0%, #f0e0ff 100%)",
      quote: '"Level up your focus with epic soundtracks."',
      songs: `
                <div class="s-card"><div class="s-cover c2"></div><h4>Arcade Dreams</h4><p>Gaming • 45 songs</p></div>
                <div class="s-card"><div class="s-cover c3"></div><h4>Battle Beats</h4><p>Electronic • 38 songs</p></div>
            `,
    },
    love: {
      bg: "#fff8fa",
      hero: "linear-gradient(135deg, #ffc9e3 0%, #ffe3f0 100%)",
      quote: '"Music for your heart and soul."',
      songs: `
                <div class="s-card"><div class="s-cover c2"></div><h4>Heart Strings</h4><p>Romance • 42 songs</p></div>
                <div class="s-card"><div class="s-cover c4"></div><h4>Love Notes</h4><p>Ballads • 31 songs</p></div>
            `,
    },
    sleep: {
      bg: "#1a1b30",
      hero: "linear-gradient(135deg, #252852 0%, #161729 100%)",
      quote: '"Time to drift away into the clouds."',
      songs: `
                <div class="s-card"><div class="s-cover c1"></div><h4>Deep Sleep</h4><p>Sounds • 50 songs</p></div>
                <div class="s-card"><div class="s-cover c3"></div><h4>Starry Night</h4><p>Lullaby • 20 songs</p></div>
            `,
    },
  };

  // Priradíme dáta podľa vybranej nálady (alebo použijeme štúdiovú ako predvolenú)
  const config = moodConfigs[mood] || moodConfigs["study"];

  body.style.background = config.bg;
  if (hero) hero.style.background = config.hero;
  if (quote) quote.textContent = config.quote;
  if (songContainer) songContainer.innerHTML = config.songs;

  // Pridanie aktívnej triedy kliknutému elementu
  const activeBtn = document.querySelector(
    `button[onclick="changeMood('${mood}')"]`,
  );
  if (activeBtn) activeBtn.classList.add("active");
}
