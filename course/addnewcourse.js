document.getElementById("cancelButton").addEventListener("click", function() {
    document.getElementById("courseLevel").value = "";
    document.getElementById("courseCode").value = "";
    document.getElementById("courseName").value = "";
});



const addnewcourseForm = document.getElementById("addnewcourse-form");
const courseLevel = document.getElementById("courseLevel");
const courseCode = document.getElementById("courseCode");
const courseName = document.getElementById("courseName");
const staffId = localStorage.getItem('uid');


addnewcourseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const level = courseLevel.value
    const code = courseCode.value
    const name = courseName.value

    fetch('http://127.0.0.1:5000/add_course', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "current_user_id": staffId,
        "course_level": level,
        "course_code" : code,
        "course_name" : name
      })
    }).then(res =>{
      return res.json()
    } )
    .then((body) => {
        alert(body.message)
      }
    )
  })