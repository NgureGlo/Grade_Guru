function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }

  function loadStudents(){
    let url = '';
    if(role == 'Administrator'){
      url = 'http://127.0.0.1:5000/view_students';
    }else{
      url = `http://127.0.0.1:5000/lecturer_students/${uid}`;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      },
    }).then(res =>{
      return res.json()
    } )
    .then((body) => {
      const studentTableBody = document.getElementById('student-table-body');

                // Loop through the data and create table rows
                body.data.forEach(student => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${student.student_reg_no}</td>
                        <td>${student.student_name}</td>
                        <td>${student.course_code}</td>
                        <td><button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button></td>
                    `;
                    studentTableBody.appendChild(row);
                });
    })
  }


document.addEventListener('DOMContentLoaded', () => {
  loadStudents()
})

function deleteStudent(studentId) {
  fetch('http://127.0.0.1:5000/student/delete/'+studentId, {
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

document.addEventListener('DOMContentLoaded', () => {
  if (role != 'Administrator'){
    document.getElementById('manage_users').style.display = 'none';
  }else{
    document.getElementById('add_new').style.display = 'none';
  }
})