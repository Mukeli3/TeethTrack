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
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            if (email === '' || password === '') {
                alert('Please fill in all fields');
            } else {
                // Sending login data to the back-end
                try {
                    const response = await fetch('http://127.0.0.1:5000/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Login successful:', data);
                        alert('Login successful!');
                        // Redirect to dashboard after successful login
                        window.location.href = '/dashboard.html';
                    } else {
                        console.error('Login failed:', response.statusText);
                        alert('Login failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Error during login request:', error);
                    alert('An error occurred. Please try again.');
                }
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
