document.getElementById("cancelButton").addEventListener("click", function() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById("role").value = "";
    // document.getElementById("profilePhoto").value = "";
});

document.getElementById("submitButton").addEventListener("click", function() {
    alert("Submitted");
});
