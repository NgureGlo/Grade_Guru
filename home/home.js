function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
  
document.addEventListener('DOMContentLoaded', () => {
  if (role != 'Administrator'){
    document.getElementById('manage_users').style.display = 'none';
  }
})