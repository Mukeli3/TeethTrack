document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/billing', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const billingDiv = document.getElementById('billingInfo');
            billingDiv.innerHTML = "<h3>Your Billing Information</h3>";
            billingDiv.innerHTML += `
                <p>Total Amount Due: $${data.total_due}</p>
                <p>Due Date: ${data.due_date}</p>
                <p>Payment Status: ${data.payment_status}</p>
            `;
        } else {
            alert('Error fetching billing information.');
        }
    })
    .catch(error => console.error('Error:', error));
});
