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
      

    })
})
    