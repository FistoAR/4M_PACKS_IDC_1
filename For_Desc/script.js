const navToggle = document.getElementById('navToggle');
const tocNav = document.getElementById('tocNav');
const navOverlay = document.getElementById('navOverlay');
function openMenu() {
    navToggle.classList.add('open');
    tocNav.classList.add('show');
    navOverlay.classList.add('show');
    navToggle.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
    navToggle.classList.remove('open');
    tocNav.classList.remove('show');
    navOverlay.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
}
navToggle.addEventListener('click', function () {
    if (tocNav.classList.contains('show')) closeMenu();
    else openMenu();
});
navOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.toc-list a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
// Keyboard: ESC to close
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") closeMenu();
});


// SHARE BUTTON LOGIC
const shareBtn = document.getElementById('shareBtn');
const shareMenu = document.getElementById('shareMenu');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const copiedMsg = document.getElementById('copiedMsg');
const shareInput = document.getElementById('shareInput');

shareInput.value = window.location.href;

shareBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const wasOpen = shareMenu.classList.contains('show');
    document.querySelectorAll('.share-menu.show').forEach(el => el.classList.remove('show'));
    if (!wasOpen) {
        shareMenu.classList.add('show');
        shareMenu.setAttribute('aria-hidden', 'false');
        try {
            shareInput.value = window.top.location.href;
        } catch (e) {
            // fallback to current window location if cross-origin blocked
            shareInput.value = window.location.href;
        }
        setTimeout(() => shareInput.select(), 90);
    } else {
        shareMenu.classList.remove('show');
        shareMenu.setAttribute('aria-hidden', 'true');
    }
});
copyLinkBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(shareInput.value).then(function () {
        copiedMsg.classList.add('show');
        setTimeout(() => copiedMsg.classList.remove('show'), 1200);
    });
    shareInput.select();
});

// hide share menu on body/overlay click or Esc
document.addEventListener('click', e => {
    if (!shareMenu.contains(e.target) && !shareBtn.contains(e.target))
        shareMenu.classList.remove('show');
});
document.addEventListener('keydown', e => {
    if (e.key === "Escape") shareMenu.classList.remove('show');
});


window.addEventListener('load', function () {
    const bgmAudio = document.getElementById('bgmAudio');
    bgmAudio.volume = 0.15;
    const bgmButton = document.getElementById('bgmButton');
    let musicOn = true;

    function toggleMusic() {
        if (musicOn) {
            bgmAudio.pause();
            bgmButton.textContent = '🎵 OFF';
            bgmButton.classList.add('off');
            musicOn = false;
        } else {
            bgmAudio.play().then(function () {
                bgmButton.textContent = '🎵 ON';
                bgmButton.classList.remove('off');
                musicOn = true;
            }).catch(function (error) {
                console.log('Could not play music:', error);
            });
        }
    }

    bgmButton.onclick = toggleMusic;

    setTimeout(function () {
        bgmAudio.play().catch(function (error) {
            musicOn = false;
            bgmButton.textContent = '🎵 OFF';
            bgmButton.classList.add('off');
        });
    }, 500);

    const goToPage1 = document.getElementById("goToPage1");

    goToPage1.addEventListener("click", function () {
        if ($("#flipbook").turn) {
            $("#flipbook").turn("page", 1);
        }

        const audioPath = goToPage1.dataset.audioPath;
        if (audioPath) {
            const audio = new Audio(audioPath);
            audio.play();
        }
    });

     document.getElementById("whatsappShareBtn").addEventListener("click", function () {
      const pageUrl = document.getElementById("shareInput").value || window.location.href;
      const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(pageUrl);
      window.open(whatsappUrl, "_blank");
    });
});







// // lid and tub color change js code 

// // === Element References ===
// const colorOptionsContainer = document.getElementById("colorOptions");
// const materialDropdown = document.getElementById("materialType");
// const colorPickerLid = document.getElementById("color_picker_lid");
// const colorPickerTub = document.getElementById("color_picker_tub");
// const modelViewer = document.querySelector("model-viewer");
 
// // === Utility: Convert HEX → RGBA ===
// function hexToRgba(hex) {
//   const r = parseInt(hex.slice(1, 3), 16) / 255;
//   const g = parseInt(hex.slice(3, 5), 16) / 255;
//   const b = parseInt(hex.slice(5, 7), 16) / 255;
//   return [r, g, b, 1];
// }

// // === Render Color Options (for lid or tub) ===
// function renderColorOptions(type) {
//   colorOptionsContainer.innerHTML = ""; // clear existing buttons
 
//   const colors =
//     type === "lid"
//       ? ["white", "transparent", "custom"]
//       : ["black", "white", "transparent", "custom"];
 
//   colors.forEach((color) => {
//     const input = document.createElement("input");
//     const label = document.createElement("label");
//     const colorId = `color-${type}-${color}`;
 
//     input.type = "radio";
//     input.name = `color-${type}`;
//     input.id = colorId;
//     input.value = color;
 
//     label.htmlFor = colorId;
//     label.classList.add("color-label");
//     label.title = color.charAt(0).toUpperCase() + color.slice(1);
 
//     if (color === "custom") {
//       label.classList.add("color-palette-card");
//       const img = document.createElement("img");
//       img.src = "./assets/images/color-picker-img.svg";
//       img.classList.add("custom-picker-img");
//       img.alt = "Color Picker";
//       label.appendChild(img);
 
//       label.addEventListener("click", () => {
//         (type === "lid" ? colorPickerLid : colorPickerTub).click();
//       });
//     } else {
//       label.textContent = color.charAt(0).toUpperCase() + color.slice(1);
//     }
 
//     colorOptionsContainer.appendChild(input);
//     colorOptionsContainer.appendChild(label);
 
//     // === Color Selection Event ===
//     input.addEventListener("change", () => {
//       applyMaterialColor(type, color);
//     });
//   });
// }
 
// // === Apply Selected Color to Model Material ===
// function applyMaterialColor(type, color) {
//   // Find the currently active lightbox (either :target or with an "active" class)
//   const activeLightbox = document.querySelector(".lightbox-target:target, .lightbox-target.active");

//   if (!activeLightbox) {
//     console.warn("⚠ No active lightbox/model-viewer found.");
//     return;
//   }

//   // Find the model-viewer inside it
//   const modelViewer = activeLightbox.querySelector("model-viewer");
//   if (!modelViewer?.model) {
//     console.warn("⚠ Model not yet loaded.");
//     return;
//   }

//   const targetName = type === "lid" ? "lid" : "bottom";
//   const materials = modelViewer.model.materials;

//   const mainMaterial = materials.find(
//     (m) => m.name.toLowerCase() === targetName
//   );

//   if (!mainMaterial) {
//     console.warn(`⚠ Material '${targetName}' not found`);
//     return;
//   }

//   // Helper to apply color settings
//   const applyToMaterial = (material) => {
//     const pbr = material.pbrMetallicRoughness;

//     if (color === "transparent") {
//       pbr.setBaseColorFactor([1, 1, 1, 0.36]);
//       material.setAlphaMode("BLEND");
//       pbr.setMetallicFactor(1);
//       pbr.setRoughnessFactor(0.12);
//       material.setEmissiveFactor("#888888");
//     } else if (color === "black") {
//       pbr.setBaseColorFactor([0, 0, 0, 1]);
//       pbr.setMetallicFactor(0);
//       pbr.setRoughnessFactor(0.5);
//       material.setAlphaMode("OPAQUE");
//       material.setEmissiveFactor([0, 0, 0]);
//     } else if (color === "white") {
//       if (pbr.metallicRoughnessTexture) {
//         pbr.metallicRoughnessTexture.setTexture(null);
//       }

//       pbr.setBaseColorFactor("#ffffff");
//       pbr.setMetallicFactor(0);
//       pbr.setRoughnessFactor(0.5);
//       material.setAlphaMode("OPAQUE");
//       material.setEmissiveFactor([0, 0, 0]);
//     }

//     if (material.name === "bottom_3") {
//       pbr.setMetallicFactor(0.5);
//       pbr.setRoughnessFactor(0);
//     }
//   };

//   // Apply to main material
//   applyToMaterial(mainMaterial);

//   // Apply to additional parts if bottom
//   if (targetName === "bottom") {
//     const additionalMaterialNames = ["label_side_area", "bottom_2", "bottom_3"];
//     additionalMaterialNames.forEach((name) => {
//       const material = materials.find(
//         (m) => m.name.trim().toLowerCase() === name
//       );
//       if (material) {
//         applyToMaterial(material);
//         console.log(`🎨 Also applied '${color}' to '${name}'`);
//       }
//     });
//   }

//   modelViewer.requestUpdate();
//   console.log(`🎨 Applied ${color} to ${type} in current model viewer`);
// }

 
// // === Handle Color Picker Input (Dynamic Model Viewer) ===
// [colorPickerLid, colorPickerTub].forEach((picker) => {
//   picker.addEventListener("input", (e) => {
//     // 1️⃣ Detect which lightbox is currently active/open
//     const activeLightbox = document.querySelector(".lightbox-target:target, .lightbox-target.active");
//     if (!activeLightbox) {
//       console.warn("⚠ No active model viewer found.");
//       return;
//     }

//     // 2️⃣ Get the model-viewer inside the active lightbox
//     const modelViewer = activeLightbox.querySelector("model-viewer");
//     if (!modelViewer?.model) {
//       console.warn("⚠ Model not yet loaded in current viewer.");
//       return;
//     }

//     // 3️⃣ Determine which material to color
//     const isLid = e.target.id === "color_picker_lid";
//     const targetName = isLid ? "lid" : "bottom";
//     const newColor = e.target.value;

//     // 4️⃣ Define color application helper
//     const applyColorToMaterial = (material) => {
//       const pbr = material.pbrMetallicRoughness;

//       // Reset and apply new base color
//       pbr.setBaseColorFactor([1, 1, 1, 1]);
//       material.setAlphaMode("OPAQUE");
//       material.setEmissiveFactor([0, 0, 0]);
//       pbr.setMetallicFactor(0);
//       pbr.setRoughnessFactor(0.5);
//       pbr.setBaseColorFactor(newColor); // accepts hex string or array

//       // Special tweak for bottom_3
//       if (material.name === "bottom_3") {
//         pbr.setMetallicFactor(0.5);
//         pbr.setRoughnessFactor(0);
//       }
//     };

//     // 5️⃣ Find main material (lid or bottom)
//     const mainMaterial = modelViewer.model.materials.find(
//       (m) => m.name.toLowerCase() === targetName
//     );

//     if (!mainMaterial) {
//       console.warn(`⚠ Material '${targetName}' not found`);
//       return;
//     }

//     applyColorToMaterial(mainMaterial);

//     // 6️⃣ If bottom, apply to linked materials too
//     if (targetName === "bottom") {
//       const additionalMaterialNames = ["label_side_area", "bottom_2", "bottom_3"];
//       additionalMaterialNames.forEach((name) => {
//         const material = modelViewer.model.materials.find(
//           (m) => m.name.trim().toLowerCase() === name
//         );
//         if (material) {
//           applyColorToMaterial(material);
//         }
//       });
//     }

//     // 7️⃣ Request render update
//     modelViewer.requestUpdate();
//     console.log(`🎨 Custom color applied to ${targetName} in active model viewer: ${newColor}`);
//   });
// });

 
// // === Initialize UI on Dropdown Change ===
// materialDropdown.addEventListener("change", (e) => {
//   renderColorOptions(e.target.value);
// });
 
// // === Optional: Render Default Options on Page Load ===
// window.addEventListener("DOMContentLoaded", () => {
//   if (materialDropdown.value) {
//     renderColorOptions(materialDropdown.value);
//   }
// });
// // Initial render
// renderColorOptions(materialDropdown.value);



// // === Monitor changes in active lightbox ===

// // If you're using :target method (via anchor links)
// window.addEventListener("hashchange", updateMaterialUIVisibility);

// // If your code adds `.active` manually
// document.querySelectorAll(".lightbox-target").forEach(lb => {
//   lb.addEventListener("click", updateMaterialUIVisibility);
// });

// // Run once on page load
// window.addEventListener("DOMContentLoaded", updateMaterialUIVisibility);




// // === Function to check if material UI should be visible ===
// function updateMaterialUIVisibility() {
//   const materialDiv = document.querySelector(".material-colour-change-div");
  
//   // Models that should NOT show the material color picker
//   const modelsWithoutMaterialChange = [
//     "350ml_Sipper_glass",
//     "350ml_Glass",
//     "250ml_Glass_with_flat_lid",
//     "250ml_Sipper_glass",
//     "250ml_Glass",
//     "120ml_Dessert_cup"
//   ];
  
//   // Find active lightbox
//   const activeLightbox = document.querySelector(".lightbox-target:target, .lightbox-target.active");
  
//   if (!activeLightbox) {
//     // No lightbox open, hide the material UI
//     if (materialDiv) materialDiv.style.display = "none";
//     return;
//   }
  
//   // Get the ID of the active lightbox
//   const activeId = activeLightbox.id;
  
//   // Check if current model should hide the material UI
//   if (modelsWithoutMaterialChange.includes(activeId)) {
//     if (materialDiv) materialDiv.style.display = "none";
//     console.log(`🚫 Material UI hidden for: ${activeId}`);
//   } else {
//     if (materialDiv) materialDiv.style.display = "block";
//     console.log(`✅ Material UI visible for: ${activeId}`);
//   }
// }

// // === Monitor changes in active lightbox ===
// window.addEventListener("hashchange", updateMaterialUIVisibility);
// // ... rest of your code