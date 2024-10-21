document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem('username'); // Get the username from localStorage
    const historyList = document.getElementById("historyList");

    fetch('/patient/treatment_history', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include the token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadHistory(data.history);
        } else {
            alert('Could not load treatment history. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while loading treatment history.');
    });

    // Load treatment history into the DOM
    function loadHistory(history) {
        history.forEach(record => {
            historyList.innerHTML += `
                <div class="record-item">
                    <p>Date: ${record.date}</p>
                    <p>Treatment: ${record.treatment}</p>
                    <p>Notes: ${record.notes}</p>
                </div>
            `;
        });
    }

    // Handle appointment booking
    document.getElementById('bookAppointmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const appointmentDate = document.getElementById('appointmentDate').value;
        const appointmentTime = document.getElementById('appointmentTime').value;

        fetch('/patient/book_appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include the token
            },
            body: JSON.stringify({ appointmentDate, appointmentTime })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Appointment booked successfully!');
            } else {
                alert('Failed to book appointment. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while booking the appointment.');
        });
    });

    // Handle personal information update
    document.getElementById('updateInfoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        fetch('/patient/update_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include the token
            },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Personal information updated successfully!');
            } else {
                alert('Failed to update personal information. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating personal information.');
        });
    });
});
