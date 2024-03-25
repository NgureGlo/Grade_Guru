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
  }else{
    document.getElementById('stdreport_nav').style.display = 'none';
    document.getElementById('stdreport').style.display = 'none';
    document.getElementById('stdprediction_nav').style.display = 'none';
    document.getElementById('stdprediction').style.display = 'none';
  }

  loadStudents();
  loadCourses();
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


function loadStudents() {
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


const predictionForm = document.getElementById("prediction-form");
const studentRegNo = document.getElementById("select-studentRegNo");
const courseCode = document.getElementById("select-courseCode");
const courseLevel = document.getElementById("courseLevel");
const courseName = document.getElementById("courseName");
const cat1Score = document.getElementById("cat1Score");
const cat2Score = document.getElementById("cat2Score");
const assignmentScore = document.getElementById("assignmentScore");
const projectScore = document.getElementById("projectScore");

predictionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const reg = studentRegNo.value
  const code = courseCode.value
  const cat1 = parseFloat(cat1Score.value)
  const cat2 = parseFloat(cat2Score.value)
  const assignment = parseFloat(assignmentScore.value)
  const project = parseFloat(projectScore.value)

  if (!(cat1 >= -5 && cat1 <= 5)) {
    // Cat 1 score is not within the valid range
    alert('Cat 1 score must be between -5 and 5');
    return;
  }

  if (!(cat2 >= -5 && cat2 <= 5)) {
    // Cat 1 score is not within the valid range
    alert('Cat 2 score must be between -5 and 5');
    return;
  }

  if (!(assignment >= -10 && assignment <= 10)) {
    // Cat 1 score is not within the valid range
    alert('Assignment score must be between -10 and 10');
    return;
  }
  
  if (!(project >= -30 && project <= 30)) {
    // Cat 1 score is not within the valid range
    alert('Project score must be between -30 and 30');
    return;
  }

  fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      "reg_no": reg,
      "course_code" : code,
      "cat_1" : cat1,
      "cat_2" : cat2,
      "assignment" : assignment,
      "project" : project
    })
  }).then(res =>{
    return res.json()
  } )
  .then((body) => {
    if(!body.data){
      alert(body.message)
    }

    else{
      console.log(body.data);
      const queryParams = new URLSearchParams(body.data).toString();
      const url = `../results/results.html?${queryParams}`
      window.location.href=url;
    }
    }
  )
})
