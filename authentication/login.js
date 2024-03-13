// Get the tabs and forms elements
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

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

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginEmail.value
  const password = loginPassword.value
  fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
      Accept: "*/*"
    },
    body: {
      "email" : email,
      "password" : password
    }
  }).then(res => res.json())
  .then((body) => console.log(body))


  alert(email);

})
