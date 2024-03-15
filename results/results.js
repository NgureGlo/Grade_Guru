function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
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

  document.getElementById('reg_no').innerText = data.student_reg_no
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

document.addEventListener('DOMContentLoaded', () => {
  if (role != 'Administrator'){
    document.getElementById('manage_users').style.display = 'none';
  }
})