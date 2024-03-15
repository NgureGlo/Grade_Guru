function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }


const predictionForm = document.getElementById("prediction-form");
const studentRegNo = document.getElementById("studentRegNo");
const courseCode = document.getElementById("courseCode");
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
  const cat1 = cat1Score.value
  const cat2 = cat2Score.value
  const assignment = assignmentScore.value
  const project = projectScore.value
  

  fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      "student_reg_no": reg,
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

document.addEventListener('DOMContentLoaded', () => {
  if (role != 'Administrator'){
    document.getElementById('manage_users').style.display = 'none';
  }
})