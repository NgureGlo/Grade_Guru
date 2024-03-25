var uid = localStorage.getItem('uid')
var role = localStorage.getItem('role')
var reg_no = localStorage.getItem('reg_no')


async function getUserDetails(user_id) {
    let url = `http://127.0.0.1:5000/view_student/${user_id}`
    return await fetch(url).then(res => res.json());
}