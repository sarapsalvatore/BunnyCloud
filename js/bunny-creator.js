document.addEventListener("DOMContentLoaded", () => {
  const styleOptions = document.querySelectorAll(".style-option");
  const layerJacket = document.getElementById("layerJacket");
  const layerGlasses = document.getElementById("layerGlasses");
  const finishButton = document.getElementById("finishButton");

  styleOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const type = option.getAttribute("data-type");
      const imgSrc = option.getAttribute("data-src");

      // Označenie aktívneho tlačidla v menu
      option.parentElement
        .querySelectorAll(".style-option")
        .forEach((btn) => btn.classList.remove("active"));
      option.classList.add("active");

      // Logika pre bundu
      if (type === "jacket") {
        if (imgSrc === "") {
          layerJacket.style.display = "none";
          layerJacket.src = "";
        } else {
          layerJacket.src = imgSrc;
          layerJacket.style.display = "block";
        }
        localStorage.setItem("bunny_jacket", imgSrc);
      }

      // Logika pre okuliare
      if (type === "glasses") {
        if (imgSrc === "") {
          layerGlasses.style.display = "none";
          layerGlasses.src = "";
        } else {
          layerGlasses.src = imgSrc;
          layerGlasses.style.display = "block";
        }
        localStorage.setItem("bunny_glasses", imgSrc);
      }
    });
  });

  finishButton.addEventListener("click", () => {
    finishButton.style.transform = "scale(0.96)";
    setTimeout(() => {
      window.location.href = "home.html";
    }, 250);
  });
});
