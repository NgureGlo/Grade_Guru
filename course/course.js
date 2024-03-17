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

  function loadCourses(){
    let url = '';
    if(role == 'Administrator'){
      url = 'http://127.0.0.1:5000/courses';
    }else{
      url = `http://127.0.0.1:5000/lecturer_courses/${uid}`;
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
      const courseTableBody = document.getElementById('course-table-body');

                // Loop through the data and create table rows
                body.data.forEach(course => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${course.course_level}</td>
                        <td>${course.course_code}</td>
                        <td>${course.course_name}</td>
                        <td><button class="delete-btn" onclick="deleteCourse(${course.id})">Delete</button></td>
                    `;
                    courseTableBody.appendChild(row);
                });
    })
  }


document.addEventListener('DOMContentLoaded', () => {
  loadCourses()
})


function deleteCourse(courseId) {

  // Show the confirmation dialog box
  const confirmed = window.confirm('Are you sure you want to delete?');

  // Check if the user confirmed
  if (confirmed) {
      // Perform the delete action here
      fetch('http://127.0.0.1:5000/courses/delete/'+courseId, {
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

document.addEventListener('DOMContentLoaded', () => {
  if (role != 'Administrator'){
    document.getElementById('manage_users').style.display = 'none';
  }else{
    document.getElementById('add_new').style.display = 'none';
  }
})