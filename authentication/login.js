// Get the tabs and forms elements
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const signupName = document.getElementById("signup-name");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
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
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "email" : email,
      "password" : password
    })
  }).then(res =>{
    return res.json()
  } )
  .then((body) => {
    if (body.data){
      const role = body.data.role;
      const uid = body.data.uid;

      localStorage.setItem('role',role);
      localStorage.setItem('uid',uid);

      window.location.href='../home/home.html';

    }
    else{
      alert(body.message)
    }
  })
})

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = signupName.value
  const email = signupEmail.value
  const password = signupPassword.value
  fetch('http://127.0.0.1:5000/register', {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "email" : email,
      "password" : password
    })
  }).then(res =>{
    return res.json()
  } )
  .then((body) => {
    if (body.message){
      // Make the login tab and form active
      loginTab.classList.add("active");
      loginForm.classList.add("active");
      // Make the signup tab and form inactive
      signupTab.classList.remove("active");
      signupForm.classList.remove("active");

    }
    else{
      alert(body.error)
    }
    }
  )
})