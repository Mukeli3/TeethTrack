document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/dentists', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const dentistSelect = document.getElementById('dentist');
            data.dentists.forEach(dentist => {
                const option = document.createElement('option');
                option.value = dentist.id;
                option.text = dentist.name;
                dentistSelect.add(option);
            });
        } else {
            alert('Error loading dentists.');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById("appointmentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const dentistId = document.getElementById("dentist").value;

    fetch('/api/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ date, dentist_id: dentistId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Appointment booked successfully.');
            window.location.href = 'dashboard.html';
        } else {
            alert('Failed to book appointment.');
        }
    })
    .catch(error => console.error('Error:', error));
});
