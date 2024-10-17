document.addEventListener("DOMContentLoaded", function() {
    console.log("Tooth Track website is ready!");

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            if (email === '' || password === '') {
                alert('Please fill in all fields');
            } else {
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        showNotification('Login successful!');
                        // Save token and redirect or perform other logic
                    } else {
                        showNotification('Login failed: ' + data.msg);
                    }
                })
                .catch(error => {
                    showNotification('Error: ' + error.message);
                });
            }
        });
    }

    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const role = document.querySelector('#role').value;

            if (name === '' || email === '' || password === '') {
                alert('Please fill in all fields');
            } else {
                fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        role: role
                    })
                })
                .then(response => response.json())
                .then(data => {
                    showNotification('Registration successful!');
                    // Handle post-registration logic
                })
                .catch(error => {
                    showNotification('Error: ' + error.message);
                });
            }
        });
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
