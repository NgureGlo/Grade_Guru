const user_name = document.getElementById('userName')
const user_email = document.getElementById('userEmail')




document.addEventListener('DOMContentLoaded', async () => {
    const details = await getUserDetails(uid)
    user_name.innerText = details.name
    user_email.innerText = details.email
})