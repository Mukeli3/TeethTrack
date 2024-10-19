document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful. You can now log in.');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
});
