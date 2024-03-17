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