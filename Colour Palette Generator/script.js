const button = document.querySelector(".generate-btn");

button.addEventListener("click", () => {
  const color1 = randomColor();
  const color2 = randomColor();
  const color3 = randomColor();
  const color4 = randomColor();
  const color5 = randomColor();

  const colourPaletteHTML = `
    <div class="color-box">
      <div class="color" style="background-color: ${color1};"></div>
      <div class="color-info">
        <span class="hex-value">${color1}</span>
        <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
      </div>
    </div>

    <div class="color-box">
      <div class="color" style="background-color: ${color2};"></div>
      <div class="color-info">
        <span class="hex-value">${color2}</span>
        <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
      </div>
    </div>

    <div class="color-box">
      <div class="color" style="background-color: ${color3};"></div>
      <div class="color-info">
        <span class="hex-value">${color3}</span>
        <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
      </div>
    </div>

    <div class="color-box">
      <div class="color" style="background-color: ${color4};"></div>
      <div class="color-info">
        <span class="hex-value">${color4}</span>
        <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
      </div>
    </div>

    <div class="color-box">
      <div class="color" style="background-color: ${color5};"></div>
      <div class="color-info">
        <span class="hex-value">${color5}</span>
        <i class="far fa-copy copy-btn" title="Copy to clipboard"></i>
      </div>
    </div>
  `;

  document.querySelector(".palette-container").innerHTML = colourPaletteHTML;

  copyButton(); // attach listeners AFTER elements are created
});

function copyButton() {
  const copyBtn = document.querySelectorAll(".copy-btn");

  copyBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const colorCode = btn
  .closest(".color-box")
  .querySelector(".hex-value")
  .textContent;

      navigator.clipboard.writeText(colorCode)
        .then(() => {
          alert(`Color code ${colorCode} copied to clipboard!`);
        })
        .catch((err) => {
          console.error("Failed to copy color code: ", err);
        });
    });
  });
}

// initial call (optional, only if buttons exist on load)
copyButton();