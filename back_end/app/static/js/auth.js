// Function to fetch the dashboard on page load
function fetchDashboard() {
    const token = localStorage.getItem('token');

    if (!token) {
        // If there's no token, redirect to login
	console.warn('No token found, redirecting to login.');
        window.location.href = '/login';
        return;
    }
    console.log('Fetching dashboard with token:', token);

    // Make the request to the dentist dashboard
    fetch('/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Include token in the Authorization header
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Process the response as JSON
        } else {
	    console.error('Failed to fetch dashboard:', response.status, response.statusText);
            throw new Error('Unauthorized access'); // Handle unauthorized access
        }
    })
    .then(data => {
        // Handle successful response, e.g., update the UI with dashboard data
       console.log('Dashboard data received:', data); // Debugging: Check response data
    })
    .catch(error => {
        console.error('Error fetching dashboard:', error);
        // Optionally redirect to login on error
        window.location.href = '/login';
    });
}
// Login form handler
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login response data:', data);
        if (data.token) {
            localStorage.setItem('token', data.token); // Fix: Use data.token
            localStorage.setItem('username', data.user.username); // Store username in localStorage
            localStorage.setItem('role', data.user.role); // Store user role in localStorage

            console.log('Token:', data.token);  // Debugging: Check if token is stored
            console.log('Username:', data.user.username);  // Debugging: Check if username is stored
            console.log('Role:', data.user.role);  // Debugging: Check if role is stored

            // Redirect based on user role
            if (data.user.role.toLowerCase() === 'dentist') {
                window.location.href = "/dentist_dashboard";  // Redirect to dentist's dashboard
            } else if (data.user.role.toLowerCase() === 'patient') {
                window.location.href = "/patient_dashboard";  // Redirect to patient's dashboard
            } else {
                // Default case: If role is neither dentist nor patient
                window.location.href = "/dashboard";  // Fallback if role is undefined or something else
            }
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});

// Register form handler
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful. You can now log in.');
            window.location.href = "login.html";  // Redirect to login
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again later.');
    });
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Clear username from localStorage
    localStorage.removeItem('role'); // Clear role from localStorage
    window.location.href = '/login';
});

// Fetch the dashboard data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname === '/dentist_dashboard' || window.location.pathname === '/patient_dashboard') {
        fetchDashboard(); // Fetch dashboard data if on the dashboard page
    }
});
