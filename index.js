const url = "http://localhost:3000/colors";
document.addEventListener("DOMContentLoaded", function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("fetched data:", data);
            const colors = data;

            // elements //
            const listSection = document.getElementById("list-section");

            const colorContainer = document.getElementById("color-container");
            colorContainer.style.display = "flex";
            colorContainer.style.justifyContent = "flex-start";
            colorContainer.style.alignItems = "center"; 
            colorContainer.style.gap = "40px"; 
            colorContainer.style.padding = "30px";
            colorContainer.style.width = "100%";
            colorContainer.style.overflowX = "auto";

            const previewSection = document.getElementById("preview-section");
            previewSection.className = "#preview-section";
            
            const mainSwatch = document.createElement("div");
            mainSwatch.style.width = "300px";
            mainSwatch.style.height = "300px";
            mainSwatch.style.borderRadius = "10px";
            mainSwatch.style.marginBottom = "10px";
            mainSwatch.style.marginLeft = "40px";
            mainSwatch.style.justifyContent = "center";
            
            const swatchList = document.createElement("ul");
            swatchList.style.listStyleType = "none";

            // Add hover effects //
            function addHoverEffects(element) {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'scale(1.1)';
                    element.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                });
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'scale(1)';
                    element.style.boxShadow = 'none';
                });
            }

            // Start to iterate through colors //
            colors.forEach((color, index) => {
                const colorSwatchDiv = document.createElement("div");
                colorSwatchDiv.classList.add("color-swatch");
                colorSwatchDiv.style.backgroundColor = color.hex;
                colorSwatchDiv.style.width = "80px";
                colorSwatchDiv.style.height = "80px";
                colorSwatchDiv.style.borderRadius = "10px";
                colorSwatchDiv.style.display = "flex";
                colorSwatchDiv.style.justifyContent = "center";
                colorSwatchDiv.style.alignItems = "center";

                addHoverEffects(colorSwatchDiv);
                colorContainer.appendChild(colorSwatchDiv);

                colorSwatchDiv.addEventListener("click", function () {

                    if (previewSection.contains(mainSwatch)) {
                        previewSection.removeChild(mainSwatch);
                    }

                    const existingSwatchList = previewSection.querySelector("ul");
                    if (existingSwatchList) {
                        previewSection.removeChild(existingSwatchList);
                    }

                    mainSwatch.style.backgroundColor = color.hex;
                    previewSection.appendChild(mainSwatch);

                    if (previewSection.contains(swatchList)) {
                        previewSection.removeChild(swatchList);
                    } else {
                        swatchList.innerHTML = "";
                        color.swatches.forEach(swatch => {
                            const swatchItem = document.createElement("li");
                            const colorPreview = document.createElement("div");
                            colorPreview.style.backgroundColor = swatch.hex;

                            colorPreview.classList.add("swatch-preview");
                            swatchList.style.listStyleType = "none";
                            swatchList.style.cursor = "pointer";
                            swatchList.style.padding = 0;
                            swatchList.style.margin = 0;
                            swatchList.style.display = "grid";
                            swatchList.style.gap = "10px";
                            swatchItem.appendChild(colorPreview);

                            swatchList.appendChild(swatchItem);
                            addHoverEffects(swatchItem);

                            swatchItem.addEventListener('click', function () {
                                mainSwatch.style.backgroundColor = swatch.hex;
                            });
                        });
                        listSection.appendChild(swatchList);
                    }
                    console.log("Swatches:", color.swatches);
                });

                
                if (index === 0) {
                    colorSwatchDiv.click();
                }
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

