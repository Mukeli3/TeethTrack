document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem('username'); // Get the username from localStorage
    const appointmentList = document.getElementById("appointmentList");

    fetch('/dentist/appointments', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include the token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadAppointments(data.appointments);
        } else {
            alert('Could not load appointments. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while loading appointments.');
    });

    // Load appointments into the DOM
    function loadAppointments(appointments) {
        appointments.forEach(appointment => {
            appointmentList.innerHTML += `
                <div class="appointment-item">
                    <p>Date: ${appointment.date}</p>
                    <p>Dentist: ${appointment.dentist}</p>
                    <p>Status: ${appointment.status}</p>
                </div>
            `;
        });
    }

    // Handle record updates
    document.getElementById('updateRecordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const patientEmail = document.getElementById('patientEmail').value;
        const treatmentNotes = document.getElementById('treatmentNotes').value;

        fetch('/dentist/update_record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include the token
            },
            body: JSON.stringify({ patientEmail, treatmentNotes })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Record updated successfully!');
            } else {
                alert('Failed to update record. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the record.');
        });
    });
});
