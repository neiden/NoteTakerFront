

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
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
            console.log('Data:', data, 'User ID:', data.userId, 'Token:', data.token);
            localStorage.setItem('token', data.token);
        } else {
            console.error('Login failed');
        }
    })
    .catch(error => {
        console.error('Network error', error);
    });

}


function register(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('https://localhost:7089/User/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 0,
            login: username,
            password: password,
            passwordSalt: 'tempSalt',
            personId: 0
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            console.log('Registration successful');
            console.log('Data:', data, 'User ID:', data.userId, 'Token:', data.token);
            localStorage.setItem('token', data.token);
        } else {
            console.error('Registration failed');
        }
    })
    .catch(error => {
        console.error('Network error', error);
    });

}


const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', login);

const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', register);
