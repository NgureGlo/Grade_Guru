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
                        <td>${student.reg_no}</td>
                        <td>${student.courses.length == 0 ? 'No registered courses' : student.courses.join(' | ')}</td>
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

  // Show the confirmation dialog box
  const confirmed = window.confirm('Are you sure you want to delete?');

  // Check if the user confirmed
  if (confirmed) {
    // Perform the delete action here

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
}

