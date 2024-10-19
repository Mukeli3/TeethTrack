document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/user/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            window.location.href = 'login.html';
        } else {
            loadAppointments(data.appointments);
            loadRecords(data.records);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = 'login.html';
    });
});

function loadAppointments(appointments) {
    const appointmentDiv = document.getElementById("appointments");
    appointmentDiv.innerHTML = "<h3>Your Appointments</h3>";
    appointments.forEach(appointment => {
        appointmentDiv.innerHTML += `
            <div class="appointment-item">
                <p>Date: ${appointment.date}</p>
                <p>Dentist: ${appointment.dentist}</p>
                <p>Status: ${appointment.status}</p>
            </div>
        `;
    });
}

function loadRecords(records) {
    const recordsDiv = document.getElementById("records");
    recordsDiv.innerHTML = "<h3>Your Records</h3>";
    records.forEach(record => {
        recordsDiv.innerHTML += `
            <div class="record-item">
                <p>Date: ${record.date}</p>
                <p>Treatment: ${record.treatment}</p>
                <p>Notes: ${record.notes}</p>
            </div>
        `;
    });
}

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});
