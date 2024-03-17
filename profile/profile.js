const header_name = document.getElementById('headerName')
const user_name = document.getElementById('userName')
const user_email = document.getElementById('userEmail')




document.addEventListener('DOMContentLoaded', async () => {
    const details = await getUserDetails(uid)
    header_name.innerText = details.name
    user_name.innerText = details.name
    user_email.innerText = details.email
})