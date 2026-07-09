/* ===== BUNNY CREATOR ===== */

// Data tracking
let bunnyCustomization = {
  name: "My Bunny",
  bodyColor: "#ffffff",
  innerEarColor: "#ffc0d9",
  clothing: "none",
  accessories: "none"
};

// SVG Element selectors
const bunnySVG = document.getElementById("bunnySVG");
const bunnyBody = document.getElementById("bunnyBody");
const bunnyEarLeft = document.getElementById("bunnyEarLeft");
const bunnyEarRight = document.getElementById("bunnyEarRight");
const bunnyEarLeftInner = document.getElementById("bunnyEarLeftInner");
const bunnyEarRightInner = document.getElementById("bunnyEarRightInner");

// Color options - 5 pastel colors
const colorOptions = [
  { name: "white", hex: "#ffffff" },
  { name: "cream", hex: "#fffacd" },
  { name: "peach", hex: "#ffd6b3" },
  { name: "lavender", hex: "#e6d7ff" },
  { name: "mint", hex: "#d4f1f4" }
];

// Inner ear colors that pair with body colors
const innerEarColors = {
  "#ffffff": "#ffc0d9",
  "#fffacd": "#ffc2c2",
  "#ffd6b3": "#ffb3d9",
  "#e6d7ff": "#d9a6ff",
  "#d4f1f4": "#7dd3dd"
};

// Clothing items
const clothingItems = [
  { name: "None", id: "none" },
  { name: "Shirt", id: "shirt" },
  { name: "Hoodie", id: "hoodie" },
  { name: "Dress", id: "dress" }
];

// Accessories items
const accessoriesItems = [
  { name: "None", id: "none" },
  { name: "Glasses", id: "glasses" },
  { name: "Crown", id: "crown" },
  { name: "Headphones", id: "headphones" }
];

// Initialize page
document.addEventListener("DOMContentLoaded", function() {
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
  const colorGrid = document.querySelector(".options-grid");
  
  colorOptions.forEach((color, index) => {
    const button = document.createElement("button");
    button.className = "color-option";
    button.style.backgroundColor = color.hex;
    button.title = color.name;
    
    // Mark first one as active
    if (index === 0) {
      button.classList.add("active");
    }
    
    button.addEventListener("click", function() {
      // Remove active from all
      document.querySelectorAll(".color-option").forEach(btn => {
        btn.classList.remove("active");
      });
      
      // Add active to this one
      this.classList.add("active");
      
      // Update bunny color
      bunnyCustomization.bodyColor = color.hex;
      bunnyCustomization.innerEarColor = innerEarColors[color.hex];
      applyBunnyColor();
    });
    
    colorGrid.appendChild(button);
  });
}

// Apply color to bunny SVG
function applyBunnyColor() {
  bunnyBody.setAttribute("fill", bunnyCustomization.bodyColor);
  bunnyEarLeft.setAttribute("fill", bunnyCustomization.bodyColor);
  bunnyEarRight.setAttribute("fill", bunnyCustomization.bodyColor);
  bunnyEarLeftInner.setAttribute("fill", bunnyCustomization.innerEarColor);
  bunnyEarRightInner.setAttribute("fill", bunnyCustomization.innerEarColor);
}

// Initialize clothing buttons
function initializeClothingButtons() {
  const clothingGrid = document.querySelector(".options-grid-buttons");
  
  clothingItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "clothing-btn";
    button.textContent = item.name;
    button.dataset.id = item.id;
    
    // Mark first one (None) as active
    if (index === 0) {
      button.classList.add("active");
    }
    
    button.addEventListener("click", function() {
      // Remove active from all clothing buttons in this section
      document.querySelectorAll(".clothing-btn").forEach(btn => {
        btn.classList.remove("active");
      });
      
      // Add active to this one
      this.classList.add("active");
      
      // Update bunny clothing
      bunnyCustomization.clothing = item.id;
      applyClothing();
    });
    
    clothingGrid.appendChild(button);
  });
}

// Apply clothing to bunny
function applyClothing() {
  const clothingGroups = {
    "none": { shirt: 0, hoodie: 0, dress: 0 },
    "shirt": { shirt: 1, hoodie: 0, dress: 0 },
    "hoodie": { shirt: 0, hoodie: 1, dress: 0 },
    "dress": { shirt: 0, hoodie: 0, dress: 1 }
  };
  
  const clothing = clothingGroups[bunnyCustomization.clothing];
  
  document.getElementById("clothingShirt").setAttribute("opacity", clothing.shirt);
  document.getElementById("clothingHoodie").setAttribute("opacity", clothing.hoodie);
  document.getElementById("clothingDress").setAttribute("opacity", clothing.dress);
}

// Initialize accessories buttons
function initializeAccessoriesButtons() {
  const accessoriesGrid = document.querySelectorAll(".options-grid-buttons")[1];
  
  accessoriesItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "accessories-btn";
    button.textContent = item.name;
    button.dataset.id = item.id;
    
    // Mark first one (None) as active
    if (index === 0) {
      button.classList.add("active");
    }
    
    button.addEventListener("click", function() {
      // Remove active from all accessories buttons in this section
      document.querySelectorAll(".accessories-btn").forEach(btn => {
        btn.classList.remove("active");
      });
      
      // Add active to this one
      this.classList.add("active");
      
      // Update bunny accessories
      bunnyCustomization.accessories = item.id;
      applyAccessories();
    });
    
    accessoriesGrid.appendChild(button);
  });
}

// Apply accessories to bunny
function applyAccessories() {
  const accessoriesGroups = {
    "none": { glasses: 0, crown: 0, headphones: 0 },
    "glasses": { glasses: 1, crown: 0, headphones: 0 },
    "crown": { glasses: 0, crown: 1, headphones: 0 },
    "headphones": { glasses: 0, crown: 0, headphones: 1 }
  };
  
  const accessories = accessoriesGroups[bunnyCustomization.accessories];
  
  document.getElementById("accessoriesGlasses").setAttribute("opacity", accessories.glasses);
  document.getElementById("accessoriesCrown").setAttribute("opacity", accessories.crown);
  document.getElementById("accessoriesHeadphones").setAttribute("opacity", accessories.headphones);
}

// Initialize name input
function initializeNameInput() {
  const nameInput = document.getElementById("bunnyName");
  const charCount = document.querySelector(".char-count");
  
  nameInput.addEventListener("input", function() {
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
  const randomBtn = document.getElementById("randomBtn");
  
  randomBtn.addEventListener("click", function() {
    // Random color
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    bunnyCustomization.bodyColor = randomColor.hex;
    bunnyCustomization.innerEarColor = innerEarColors[randomColor.hex];
    
    // Random clothing
    const randomClothing = clothingItems[Math.floor(Math.random() * clothingItems.length)];
    bunnyCustomization.clothing = randomClothing.id;
    
    // Random accessories
    const randomAccessories = accessoriesItems[Math.floor(Math.random() * accessoriesItems.length)];
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
  document.querySelectorAll(".color-option").forEach(btn => {
    btn.classList.remove("active");
    if (btn.style.backgroundColor === bunnyCustomization.bodyColor) {
      btn.classList.add("active");
    }
  });
  
  // Update clothing button
  document.querySelectorAll(".clothing-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.id === bunnyCustomization.clothing) {
      btn.classList.add("active");
    }
  });
  
  // Update accessories button
  document.querySelectorAll(".accessories-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.id === bunnyCustomization.accessories) {
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
    accessories: bunny.accessories || "none"
  };
  
  // Update name input
  const nameInput = document.getElementById("bunnyName");
  nameInput.value = bunnyCustomization.name;
  document.querySelector(".char-count").textContent = `${bunnyCustomization.name.length}/15`;
  
  updateUIFromCustomization();
}

// Initialize finish button
function initializeFinishButton() {
  const finishBtn = document.getElementById("finishBtn");
  
  finishBtn.addEventListener("click", function() {
    // Validate name
    if (!bunnyCustomization.name || bunnyCustomization.name.trim().length === 0) {
      bunnyCustomization.name = "My Bunny";
    }
    
    // Save to localStorage
    const bunnyData = {
      name: bunnyCustomization.name,
      bodyColor: bunnyCustomization.bodyColor,
      innerEarColor: bunnyCustomization.innerEarColor,
      clothing: bunnyCustomization.clothing,
      accessories: bunnyCustomization.accessories
    };
    
    localStorage.setItem("bunnycloud_bunny", JSON.stringify(bunnyData));
    
    // Show animation
    this.textContent = "Saved!";
    this.style.background = "linear-gradient(135deg, #7dd3dd 0%, #5bc4d1 100%)";
    
    // Redirect after 800ms
    setTimeout(() => {
      window.location.href = "home.html";
    }, 800);
  });
}
      option.classList.add("active");
      bunnyData.color = option.getAttribute("data-color");
      updateBunnyColor();
    });
  });

  // Headphones Selection
  headphonesOptions.forEach((option) => {
    if (option.getAttribute("data-headphones") === bunnyData.headphones) {
      option.classList.add("active");
    }

    option.addEventListener("click", () => {
      headphonesOptions.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      bunnyData.headphones = option.getAttribute("data-headphones");
    });
  });

  // Clothes Selection
  clothesOptions.forEach((option) => {
    if (option.getAttribute("data-clothes") === bunnyData.clothes) {
      option.classList.add("active");
    }

    option.addEventListener("click", () => {
      clothesOptions.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      bunnyData.clothes = option.getAttribute("data-clothes");
    });
  });

  // Accessories Selection
  accessoriesOptions.forEach((option) => {
    if (option.getAttribute("data-accessories") === bunnyData.accessories) {
      option.classList.add("active");
    }

    option.addEventListener("click", () => {
      accessoriesOptions.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
      bunnyData.accessories = option.getAttribute("data-accessories");
    });
  });

  // Random Button
  randomButton.addEventListener("click", () => {
    const colors = ["#dcc6ff", "#ffc2e3", "#bfeaff", "#fff9c4", "#c6f3db", "#ffe9b5"];
    const headphones = ["none", "music", "gaming", "study"];
    const clothes = ["none", "hoodie", "dress", "sweater"];
    const accessories = ["none", "glasses", "crown", "bowtie"];

    bunnyData.color = colors[Math.floor(Math.random() * colors.length)];
    bunnyData.headphones = headphones[Math.floor(Math.random() * headphones.length)];
    bunnyData.clothes = clothes[Math.floor(Math.random() * clothes.length)];
    bunnyData.accessories = accessories[Math.floor(Math.random() * accessories.length)];

    // Update UI
    updateColorSelection();
    updateHeadphonesSelection();
    updateClothesSelection();
    updateAccessoriesSelection();
    updateBunnyColor();
  });

  // Finish Button
  finishButton.addEventListener("click", () => {
    if (!bunnyData.name.trim()) {
      alert("Prosím daj svojmu bunnýmu meno! 🐰");
      bunnyNameInput.focus();
      return;
    }

    // Save bunny data
    localStorage.setItem("bunnycloud_bunny", JSON.stringify(bunnyData));
    localStorage.setItem("bunnycloud_bunnyName", bunnyData.name);

    // Animation
    finishButton.style.transform = "scale(0.96)";
    finishButton.textContent = "✓ Hotovo!";
    finishButton.style.opacity = "0.7";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 800);
  });

  // ===== HELPER FUNCTIONS =====

  function updateBunnyColor() {
    const color = bunnyData.color;
    const lightColor = adjustBrightness(color, 30);

    bunnyBody.setAttribute("fill", color);
    bunnyEarLeft.setAttribute("fill", color);
    bunnyEarRight.setAttribute("fill", color);
    bunnyTail.setAttribute("fill", "white");

    // Update inner ears color
    const innerEars = document.querySelectorAll("ellipse[fill='#f0d9ff']");
    innerEars.forEach((ear) => {
      ear.setAttribute("fill", lightColor);
    });
  }

  function adjustBrightness(color, amount) {
    let col = parseInt(color.slice(1), 16);
    let r = (col >> 16) & 255;
    let g = (col >> 8) & 255;
    let b = col & 255;

    r = Math.min(255, r + amount);
    g = Math.min(255, g + amount);
    b = Math.min(255, b + amount);

    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  }

  function updateColorSelection() {
    colorOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-color") === bunnyData.color) {
        option.classList.add("active");
      }
    });
  }

  function updateHeadphonesSelection() {
    headphonesOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-headphones") === bunnyData.headphones) {
        option.classList.add("active");
      }
    });
  }

  function updateClothesSelection() {
    clothesOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-clothes") === bunnyData.clothes) {
        option.classList.add("active");
      }
    });
  }

  function updateAccessoriesSelection() {
    accessoriesOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-accessories") === bunnyData.accessories) {
        option.classList.add("active");
      }
    });
  }

  // Initialize bunny color on load
  updateBunnyColor();
});
