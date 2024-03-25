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

document.addEventListener('DOMContentLoaded', () => {
  
  function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const data = {};
    for (const [key, value] of queryParams.entries()) {
        data[key] = value;
    }
    return data;
  }

  // Get query parameters and display the data
  const data = getQueryParams();

  document.getElementById('reg_no').innerText = data.reg_no
  document.getElementById('course_code').innerText = data.course_code
  document.getElementById('cat_1').innerText = data.cat_1
  document.getElementById('cat_2').innerText = data.cat_2
  document.getElementById('assignment').innerText = data.assignment
  document.getElementById('project').innerText = data.project
  document.getElementById('expected_exam').innerText = data.expected_exam
  document.getElementById('expected_total').innerText = data.expected_total
  document.getElementById('expected_grade').innerText = data.expected_grade

  console.log('data', data);

});
