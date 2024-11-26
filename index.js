const url = "http://localhost:3000/colors";
document.addEventListener("DOMContentLoaded", () => {

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Fetched data:", data);
        const colors = data;

        const appContainer = document.getElementById("app-container");
        appContainer.classList.add("#app-container")
        // add style
        const colorContainer = document.getElementById("color-viewer");
        colorContainer.classList.add("#color-viewer")
        // add style
        const previewSection = document.getElementById("preview-section");
        previewSection.classList.add("#preview-section");
        // add style
        const mainSwatch = document.createElement("div");
        mainSwatch.classList.add("#div");
        // add style
        const likeButton = document.createElement("button"); 
        likeButton.classList.add("#button");
        likeButton.textContent = '♡';  
        likeButton.style.cursor = "pointer";
        likeButton.style.color = "red";
        likeButton.style.borderColor = "white";

        const swatchList = document.createElement("ul");
        swatchList.classList.add("#ul");
        // add style
        const colorInfoDiv = document.createElement("div");
        colorInfoDiv.classList.add("#div");
        // add style
        const colorSwatchDiv = document.createElement("div");
        colorSwatchDiv.classList.add("#div");
        // add style
       
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

           

        });
        
    })
    .catch(error => {
        console.error("Error:", error);
    });
})
    