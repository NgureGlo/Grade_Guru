document.getElementById("cancelButton").addEventListener("click", function() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById("role").value = '';
});


const addnewuserForm = document.getElementById("addnewuser-form");
const userName = document.getElementById("name");
const userRegNo = document.getElementById("regno");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const userRole = document.getElementById("role");
// const staffId = localStorage.getItem('uid');


addnewuserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = userName.value
    const regno = userRegNo.value
    const email = userEmail.value
    const password = userPassword.value
    const role = userRole.value

    fetch('http://127.0.0.1:5000/register_student', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        // "current_user_id": staffId,
        "name": name,
        "reg_no": regno,
        "email" : email,
        "password" : password,
        "role" : role
      })
    }).then(res =>{
      return res.json()
    } )
    .then((body) => {
        alert(body.message)
      }
    )
  })
