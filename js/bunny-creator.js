/* ===== BUNNY CREATOR ===== */

// Data tracking
let bunnyCustomization = {
  name: "My Bunny",
  bodyColor: "#ffffff",
  innerEarColor: "#ffc0d9",
  clothing: "none",
  accessories: "none",
};

// SVG Element selectors
const bunnySVG = document.getElementById("bunnySVG");
const bunnyBody = document.getElementById("bunnyBody");
const bunnyHead = document.getElementById("bunnyHeadShape");
const bunnyEarLeft = document.getElementById("earLeftOuter");
const bunnyEarRight = document.getElementById("earRightOuter");
const bunnyEarLeftInner = document.getElementById("earLeftInner");
const bunnyEarRightInner = document.getElementById("earRightInner");

// Color options - 5 pastel colors
const colorOptions = [
  { name: "white", hex: "#ffffff" },
  { name: "cream", hex: "#fffacd" },
  { name: "peach", hex: "#ffd6b3" },
  { name: "lavender", hex: "#e6d7ff" },
  { name: "mint", hex: "#d4f1f4" },
];

// Inner ear colors that pair with body colors
const innerEarColors = {
  "#ffffff": "#ffc0d9",
  "#fffacd": "#ffc2c2",
  "#ffd6b3": "#ffb3d9",
  "#e6d7ff": "#d9a6ff",
  "#d4f1f4": "#7dd3dd",
};

// Clothing items
const clothingItems = [
  { name: "None", id: "none" },
  { name: "Shirt", id: "shirt" },
  { name: "Hoodie", id: "hoodie" },
  { name: "Dress", id: "dress" },
];

// Accessories items
const accessoriesItems = [
  { name: "None", id: "none" },
  { name: "Glasses", id: "glasses" },
  { name: "Crown", id: "crown" },
  { name: "Headphones", id: "headphones" },
];

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  initializeColorButtons();
  initializeClothingButtons();
  initializeAccessoriesButtons();
  initializeRandomButton();
  initializeNameInput();
  initializeFinishButton();

  // Load saved bunny data if exists
  const savedBunny = localStorage.getItem("bunnycloud_bunny");
  if (savedBunny) {
    try {
      const bunny = JSON.parse(savedBunny);
      loadBunnyData(bunny);
    } catch (e) {
      console.log("No saved bunny data");
    }
  }
});

// Initialize color buttons
function initializeColorButtons() {
  const colorButtons = document.querySelectorAll(".options-grid .color-option");

  if (colorButtons.length === 0) {
    const colorGrid = document.querySelector(".options-grid");
    colorOptions.forEach((color, index) => {
      const button = document.createElement("button");
      button.className = "color-option";
      button.style.backgroundColor = color.hex;
      button.title = color.name;
      button.dataset.bodycolor = color.hex;
      button.dataset.innerearscolor = innerEarColors[color.hex];

      if (index === 0) {
        button.classList.add("active");
      }

      button.addEventListener("click", colorButtonClickHandler);
      colorGrid.appendChild(button);
    });
  } else {
    colorButtons.forEach((button, index) => {
      if (!button.dataset.bodycolor) {
        button.dataset.bodycolor =
          button.getAttribute("data-bodycolor") || "#ffffff";
      }
      if (!button.dataset.innerearscolor) {
        button.dataset.innerearscolor =
          button.getAttribute("data-innerearscolor") || "#ffc0d9";
      }
      if (
        index === 0 &&
        !document.querySelector(".options-grid .color-option.active")
      ) {
        button.classList.add("active");
      }
      button.style.backgroundColor = button.dataset.bodycolor;
      button.addEventListener("click", colorButtonClickHandler);
    });
  }
}

function colorButtonClickHandler() {
  document.querySelectorAll(".options-grid .color-option").forEach((btn) => {
    btn.classList.remove("active");
  });
  this.classList.add("active");
  bunnyCustomization.bodyColor = this.dataset.bodycolor;
  bunnyCustomization.innerEarColor = this.dataset.innerearscolor;
  applyBunnyColor();
}

// Apply color to bunny SVG
function applyBunnyColor() {
  bunnyBody.setAttribute("fill", bunnyCustomization.bodyColor);
  if (bunnyHead) bunnyHead.setAttribute("fill", bunnyCustomization.bodyColor);
  if (bunnyEarLeft)
    bunnyEarLeft.setAttribute("fill", bunnyCustomization.bodyColor);
  if (bunnyEarRight)
    bunnyEarRight.setAttribute("fill", bunnyCustomization.bodyColor);
  if (bunnyEarLeftInner)
    bunnyEarLeftInner.setAttribute("fill", bunnyCustomization.innerEarColor);
  if (bunnyEarRightInner)
    bunnyEarRightInner.setAttribute("fill", bunnyCustomization.innerEarColor);
}

// Initialize clothing buttons
function initializeClothingButtons() {
  const clothingButtons = document.querySelectorAll(
    ".options-grid-buttons .clothing-btn",
  );
  clothingButtons.forEach((button, index) => {
    if (
      index === 0 &&
      !document.querySelector(".options-grid-buttons .clothing-btn.active")
    ) {
      button.classList.add("active");
    }
    button.addEventListener("click", function () {
      clothingButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      bunnyCustomization.clothing = this.dataset.clothing;
      applyClothing();
    });
  });
}

// Apply clothing to bunny
function applyClothing() {
  const clothingGroups = {
    none: { shirt: 0, hoodie: 0, dress: 0 },
    shirt: { shirt: 1, hoodie: 0, dress: 0 },
    hoodie: { shirt: 0, hoodie: 1, dress: 0 },
    dress: { shirt: 0, hoodie: 0, dress: 1 },
  };

  const clothing = clothingGroups[bunnyCustomization.clothing];

  document
    .getElementById("clothingShirt")
    .setAttribute("opacity", clothing.shirt);
  document
    .getElementById("clothingHoodie")
    .setAttribute("opacity", clothing.hoodie);
  document
    .getElementById("clothingDress")
    .setAttribute("opacity", clothing.dress);
}

// Initialize accessories buttons
function initializeAccessoriesButtons() {
  const accessoriesButtons = document.querySelectorAll(
    ".options-grid-buttons .accessories-btn",
  );
  accessoriesButtons.forEach((button, index) => {
    if (
      index === 0 &&
      !document.querySelector(".options-grid-buttons .accessories-btn.active")
    ) {
      button.classList.add("active");
    }
    button.addEventListener("click", function () {
      accessoriesButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      bunnyCustomization.accessories = this.dataset.accessories;
      applyAccessories();
    });
  });
}

// Apply accessories to bunny
function applyAccessories() {
  const accessoriesGroups = {
    none: { glasses: 0, crown: 0, headphones: 0 },
    glasses: { glasses: 1, crown: 0, headphones: 0 },
    crown: { glasses: 0, crown: 1, headphones: 0 },
    headphones: { glasses: 0, crown: 0, headphones: 1 },
  };

  const accessories = accessoriesGroups[bunnyCustomization.accessories];

  document
    .getElementById("accessoriesGlasses")
    .setAttribute("opacity", accessories.glasses);
  document
    .getElementById("accessoriesCrown")
    .setAttribute("opacity", accessories.crown);
  document
    .getElementById("accessoriesHeadphones")
    .setAttribute("opacity", accessories.headphones);
}

// Initialize name input
function initializeNameInput() {
  const nameInput = document.getElementById("bunnyName");
  const charCount = document.querySelector(".char-count");

  nameInput.addEventListener("input", function () {
    let value = this.value;

    // Max 15 characters
    if (value.length > 15) {
      value = value.substring(0, 15);
      this.value = value;
    }

    bunnyCustomization.name = value || "My Bunny";
    charCount.textContent = `${value.length}/15`;
  });

  // Initialize char count
  charCount.textContent = "0/15";
}

// Initialize random button
function initializeRandomButton() {
  const randomBtn = document.getElementById("randomButton");

  randomBtn.addEventListener("click", function () {
    // Random color
    const randomColor =
      colorOptions[Math.floor(Math.random() * colorOptions.length)];
    bunnyCustomization.bodyColor = randomColor.hex;
    bunnyCustomization.innerEarColor = innerEarColors[randomColor.hex];

    // Random clothing
    const randomClothing =
      clothingItems[Math.floor(Math.random() * clothingItems.length)];
    bunnyCustomization.clothing = randomClothing.id;

    // Random accessories
    const randomAccessories =
      accessoriesItems[Math.floor(Math.random() * accessoriesItems.length)];
    bunnyCustomization.accessories = randomAccessories.id;

    // Update UI
    updateUIFromCustomization();

    // Animate button
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 100);
  });
}

// Update UI to reflect current customization
function updateUIFromCustomization() {
  // Update color button
  document.querySelectorAll(".color-option").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.bodycolor === bunnyCustomization.bodyColor) {
      btn.classList.add("active");
    }
  });

  // Update clothing button
  document.querySelectorAll(".clothing-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.clothing === bunnyCustomization.clothing) {
      btn.classList.add("active");
    }
  });

  // Update accessories button
  document.querySelectorAll(".accessories-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.accessories === bunnyCustomization.accessories) {
      btn.classList.add("active");
    }
  });

  // Apply all visual changes
  applyBunnyColor();
  applyClothing();
  applyAccessories();
}

// Load saved bunny data
function loadBunnyData(bunny) {
  bunnyCustomization = {
    name: bunny.name || "My Bunny",
    bodyColor: bunny.bodyColor || "#ffffff",
    innerEarColor: bunny.innerEarColor || "#ffc0d9",
    clothing: bunny.clothing || "none",
    accessories: bunny.accessories || "none",
  };

  // Update name input
  const nameInput = document.getElementById("bunnyName");
  nameInput.value = bunnyCustomization.name;
  document.querySelector(".char-count").textContent =
    `${bunnyCustomization.name.length}/15`;

  updateUIFromCustomization();
}

// Initialize finish button
function initializeFinishButton() {
  const finishBtn =
    document.getElementById("finishButton") ||
    document.getElementById("finishBtn");

  if (!finishBtn) return;

  finishBtn.addEventListener("click", async function () {
    if (
      !bunnyCustomization.name ||
      bunnyCustomization.name.trim().length === 0
    ) {
      bunnyCustomization.name = "My Bunny";
    }

    const avatarUrl = getSvgAvatarUrl();
    const bunnyData = {
      name: bunnyCustomization.name,
      bodyColor: bunnyCustomization.bodyColor,
      innerEarColor: bunnyCustomization.innerEarColor,
      clothing: bunnyCustomization.clothing,
      accessories: bunnyCustomization.accessories,
      avatarUrl,
    };

    localStorage.setItem("bunnycloud_bunny", JSON.stringify(bunnyData));
    localStorage.setItem("bunnycloud_bunnyName", bunnyCustomization.name);
    localStorage.setItem(
      "bunnycloud_currentUser",
      JSON.stringify({ username: bunnyCustomization.name }),
    );
    localStorage.setItem("bunnycloud_username", bunnyCustomization.name);

    this.textContent = "Saved!";
    this.style.background = "linear-gradient(135deg, #7dd3dd 0%, #5bc4d1 100%)";

    setTimeout(() => {
      window.location.assign("home.html");
    }, 800);
  });
}

function getSvgAvatarUrl() {
  const serializer = new XMLSerializer();
  const svgText = serializer.serializeToString(bunnySVG);
  const encoded = encodeURIComponent(svgText)
    .replace(/'/g, "%27")
    .replace(/\x22/g, "%22");
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}
