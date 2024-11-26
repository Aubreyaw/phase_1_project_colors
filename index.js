const url = "http://localhost:3000/colors";
document.addEventListener("DOMContentLoaded", function () {
   
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("fetched data:", data);
            const colors = data;

            // elements //
            const appContainer = document.getElementById("app-container");
            appContainer.style.display = "flex";
            appContainer.style.flexDirection = "column";
            appContainer.style.alignItems = "center";
            
            const colorContainer = document.getElementById("color-container");
            colorContainer.style.display = "flex";
            colorContainer.style.justifyContent = "flex-start";
            colorContainer.style.alignItems = "center"; 
            colorContainer.style.gap = "10px"; 
            colorContainer.style.padding = "10px";
            colorContainer.style.width = "100%";
            colorContainer.style.overflowX = "auto";

            const previewSection = document.getElementById("preview-section");
            previewSection.className = "#preview-section"
            
            const mainSwatch = document.createElement("div");
            mainSwatch.style.width = "300px";
            mainSwatch.style.height = "300px";
            mainSwatch.style.borderRadius = "10px";
            mainSwatch.style.marginBottom = "10px";
            mainSwatch.style.marginLeft = "40px"
            mainSwatch.style.justifyContent = "center";
            
            const likeButton = document.createElement("button"); 
            likeButton.textContent = '♡';  
            likeButton.style.cursor = "pointer";
            likeButton.style.color = "red";
            likeButton.style.borderColor = "white";
            
            const swatchList = document.createElement("ul");
            swatchList.style.listStyleType = "none";

            const colorInfoDiv = document.createElement("div");

            const colorSwatchDiv = document.createElement("div");
            colorSwatchDiv.classList.add("color-swatch");

            // elements //

            // Like button stuff //
            

            likeButton.addEventListener('mouseenter', () => {
                likeButton.style.transform = 'scale(1.1)';
                likeButton.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
            });

            likeButton.addEventListener('mouseleave', () => {
                likeButton.style.transform = 'scale(1)';
                likeButton.style.boxShadow = 'none';
            });

            let currentColorId = null;
            let isLiked = false;
    
            likeButton.addEventListener("click", () => {
                if (currentColorId) {
                    const patchUrl = `${url}/${currentColorId}`;
                    isLiked = !isLiked;
                    const likesValue = isLiked;
                    likeButton.textContent = isLiked ? "♥" : "♡";
                    fetch(patchUrl, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ likes: likesValue }),
                    })
                        .then(response => response.json())
                        .then(updatedColor => {
                            console.log("Updated color:", updatedColor);
                        })
                        .catch(error => {
                            console.error("Error updating color:", error);
                        });
                } else {
                    console.error("No color selected!");
                }
            });
            //// Like button stuff ////

            

            // Start to iterate through colors //
            colors.forEach(color => {
                currentColorId = color.id;
                const colorSwatchDiv = document.createElement("div");
                colorSwatchDiv.classList.add("color-swatch");
                colorSwatchDiv.style.backgroundColor = color.hex;
                colorSwatchDiv.style.width = "60px"
                colorSwatchDiv.style.height = "60px"
                colorSwatchDiv.style.borderRadius = "10px";
                colorSwatchDiv.style.display = "flex";
                colorSwatchDiv.style.justifyContent = "center";
                colorSwatchDiv.style.alignItems = "center";

                    colorSwatchDiv.addEventListener('mouseenter', () => {
                        colorSwatchDiv.style.transform = 'scale(1.1)';
                        colorSwatchDiv.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                    });

                    colorSwatchDiv.addEventListener('mouseleave', () => {
                        colorSwatchDiv.style.transform = 'scale(1)';
                        colorSwatchDiv.style.boxShadow = 'none';
                    });

                    colorContainer.appendChild(colorSwatchDiv)

                colorSwatchDiv.addEventListener("click", function () {

                    if (previewSection.contains(mainSwatch)) {
                        previewSection.removeChild(mainSwatch);
                        previewSection.removeChild(likeButton);
                    }

                    const existingSwatchList = previewSection.querySelector("ul");
                    if (existingSwatchList) {
                    previewSection.removeChild(existingSwatchList);
                    }
                        mainSwatch.style.backgroundColor = color.hex;
                        
                        previewSection.appendChild(mainSwatch);
                        previewSection.appendChild(likeButton);
                        

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
                                swatchItem.appendChild(colorPreview);

                                swatchList.appendChild(swatchItem);
                                swatchItem.addEventListener('mouseenter', () => {
                                    swatchItem.style.transform = 'scale(1.1)';
                                    swatchItem.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                                });
    
                                swatchItem.addEventListener('mouseleave', () => {
                                    swatchItem.style.transform = 'scale(1)';
                                    swatchItem.style.boxShadow = 'none';
                                });
    
                                swatchItem.addEventListener('click', function () {
                                    mainSwatch.style.backgroundColor = swatch.hex;
                                });

                        });
                        previewSection.appendChild(swatchList);

                    }
                    console.log("Swatches:", color.swatches);
                });
                
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});