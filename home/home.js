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
  // if (role === 'Educator'){
  //   document.getElementById('stdreport_nav').style.display = 'none';
  //   document.getElementById('stdreport').style.display = 'none';
  // }
  // if (role === 'Administrator'){
  //   document.getElementById('stdreport_nav').style.display = 'none';
  //   document.getElementById('stdreport').style.display = 'none';
  // }
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
