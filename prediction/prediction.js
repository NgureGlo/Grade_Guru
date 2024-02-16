const loginTab = document.getElementById("prediction-form");

// Add click event listeners to the form
predictionForm.addEventListener("click", function() {
  // Make the prediction form active
  predictionForm.classList.add("active");
});

function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }