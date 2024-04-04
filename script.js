const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

function login() {
    fetch('https://localhost:7089/User/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            console.log('Login successful');
            console.log('Token:', data.token , 'User:', data.user)
            localStorage.setItem('token', data.token);
        } else {
            console.error('Login failed');
        }
    })
    .catch(error => {
        console.error('Network error', error);
    });

}


const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', login);
