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
        // add style
        const swatchList = document.createElement("ul");
        swatchList.classList.add("#ul");
        // add style
        const colorInfoDiv = document.createElement("div");
        colorInfoDiv.classList.add("#div");
        // add style
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("#div");
        // add style
    })
    
})
    