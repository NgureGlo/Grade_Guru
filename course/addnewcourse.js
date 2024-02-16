document.getElementById("cancelButton").addEventListener("click", function() {
    document.getElementById("courseLevel").value = "";
    document.getElementById("courseID").value = "";
    document.getElementById("courseName").value = "";
});

document.getElementById("submitButton").addEventListener("click", function() {
    alert("Submitted");
});
