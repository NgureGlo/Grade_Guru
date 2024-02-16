// Get the tabs and forms elements
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Add click event listeners to the tabs
loginTab.addEventListener("click", function() {
  // Make the login tab and form active
  loginTab.classList.add("active");
  loginForm.classList.add("active");
  // Make the signup tab and form inactive
  signupTab.classList.remove("active");
  signupForm.classList.remove("active");
});

signupTab.addEventListener("click", function() {
  // Make the signup tab and form active
  signupTab.classList.add("active");
  signupForm.classList.add("active");
  // Make the login tab and form inactive
  loginTab.classList.remove("active");
  loginForm.classList.remove("active");
});
