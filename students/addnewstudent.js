document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('studentRegNo').value = '';
    document.getElementById("courseCode").value = "";
});


document.addEventListener('DOMContentLoaded', () => {

  select_student = document.getElementById("select-studentRegNo")
  select_student.addEventListener('change', () =>{
      loadStudents(select_student.value);
  })

  select_course = document.getElementById("select-courseCode")
  select_course.addEventListener('change', () =>{
      loadCourses(select_course.value);
  })


  loadStudents();
  loadCourses();

})

function loadStudents() {
  let url = 'http://127.0.0.1:5000/view_students';
  
  fetch(url, {
      method: 'GET',
      headers: {
          "Content-type": "application/json"
      },
      }).then(res =>{
      return res.json()
      } )
      .then((body) => {
  
      // Populate student select dropdown
      const studentSelect = document.getElementById('select-studentRegNo');
      body.data.forEach(student => {
          const option = document.createElement('option');
          option.value = student.reg_no;
          option.textContent = student.reg_no;
          studentSelect.appendChild(option);
      });
  
      console.log(body);
      })  
}

function loadCourses() {
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
  
      // Populate course select dropdown
      const courseSelect = document.getElementById('select-courseCode');
      body.data.forEach(course => {
          const option = document.createElement('option');
          option.value = course.course_code;
          option.textContent = course.course_code;
          courseSelect.appendChild(option);
      });
  
      console.log(body);
      })  
  }


const addnewstudentForm = document.getElementById("addnewstudent-form");
const studentRegNo = document.getElementById("select-studentRegNo");
const courseCode = document.getElementById("select-courseCode");
const staffId = localStorage.getItem('uid');


addnewstudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reg = studentRegNo.value
    const code = courseCode.value
    

    fetch('http://127.0.0.1:5000/add_student', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "current_user_id": staffId,
        "reg_no": reg,
        "course_code" : code
      })
    }).then(res =>{
      return res.json()
    } )
    .then((body) => {
        alert(body.message)
      }
    )
  })