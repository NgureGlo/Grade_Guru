document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('studentRegNo').value = '';
    document.getElementById('studentName').value = '';
    document.getElementById("courseLevel").value = "";
    document.getElementById("courseCode").value = "";
    document.getElementById("courseName").value = "";
});


const addnewstudentForm = document.getElementById("addnewstudent-form");
const studentRegNo = document.getElementById("studentRegNo");
const studentName = document.getElementById("studentName");
const courseCode = document.getElementById("courseCode");
const staffId = localStorage.getItem('uid');


addnewstudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reg = studentRegNo.value
    const name = studentName.value
    const code = courseCode.value
    

    fetch('http://127.0.0.1:5000/add_student', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        "current_user_id": staffId,
        "student_reg_no": reg,
        "student_name" : name,
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