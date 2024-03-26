document.addEventListener('DOMContentLoaded', async () => {
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

    await loadStudentData();
    setUpUI();
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

  async function loadStudentData(){
    const userDetails = await getUserDetails(uid);

    // Populate course select dropdown
    const courseSelect = document.getElementById('courseCode');
    userDetails.courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });

    // populate student reg number
    const userReg = document.getElementById('studentRegNo');
    userReg.value = userDetails.reg_no;

  }

  function setUpUI(){
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
      const cat1 = parseFloat(cat1Score.value)
      const cat2 = parseFloat(cat2Score.value)
      const assignment = parseFloat(assignmentScore.value)
      const project = parseFloat(projectScore.value)
    
      if (!(cat1 >= 0 && cat1 <= 5)) {
        // Cat 1 score is not within the valid range
        alert('Cat 1 score must be between 0 and 5');
        return;
      }
    
      if (!(cat2 >= 0 && cat2 <= 5)) {
        // Cat 1 score is not within the valid range
        alert('Cat 2 score must be between 0 and 5');
        return;
      }
    
      if (!(assignment >= 0 && assignment <= 10)) {
        // Cat 1 score is not within the valid range
        alert('Assignment score must be between 0 and 10');
        return;
      }
      
      if (!(project >= 0 && project <= 30)) {
        // Cat 1 score is not within the valid range
        alert('Project score must be between 0 and 30');
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
  }
  