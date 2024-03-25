document.addEventListener('DOMContentLoaded', () => {
  if (role != 'Administrator'){
    document.getElementById('manage_users').style.display = 'none';
  }
  if (role === 'Student'){
    document.getElementById('course').style.display = 'none';
    document.getElementById('student').style.display = 'none';
    document.getElementById('course_nav').style.display = 'none';
    document.getElementById('student_nav').style.display = 'none';
    document.getElementById('prediction').style.display = 'none';
    document.getElementById('prediction_nav').style.display = 'none';
    document.getElementById('reports').style.display = 'none';
    document.getElementById('reports_nav').style.display = 'none';
    document.getElementById('stdreport_nav').style.display = 'block';
    document.getElementById('stdreport').style.display = 'block';
    document.getElementById('stdprediction_nav').style.display = 'block';
    document.getElementById('stdprediction').style.display = 'block';
  }
  else{
    document.getElementById('stdreport_nav').style.display = 'none';
    document.getElementById('stdreport').style.display = 'none';
    document.getElementById('stdprediction_nav').style.display = 'none';
    document.getElementById('stdprediction').style.display = 'none';
  }
})

function toggleMenu() {
  const blurLayer = document.getElementById('blur-layer');
  var menu = document.getElementById("menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
    blurLayer.style.display = "none"
  } else {
    menu.style.display = "block";
    blurLayer.style.display = "block"
  }
}

  function loadUsers(){
    fetch('http://127.0.0.1:5000/view_users', {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      },
    }).then(res =>{
      return res.json()
    } )
    .then((body) => {
      const userTableBody = document.getElementById('user-table-body');

                // Loop through the data and create table rows
                body.data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.reg_no}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td><button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button></td>
                    `;
                    userTableBody.appendChild(row);
                });
    })
  }


document.addEventListener('DOMContentLoaded', () => {
  loadUsers()
})

function deleteUser(userId) {
  fetch('http://127.0.0.1:5000/user/delete/'+userId, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
    }).then(res =>{
      return res.json()
    } )
    .then((body) => {
      alert(body.message);
      location.reload();
    })  
}