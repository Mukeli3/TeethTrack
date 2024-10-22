document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem('username'); // Get the username from localStorage
    const appointmentList = document.getElementById("appointmentList");

    // Remove Authorization header since JWT is not being used for now
    fetch('/dentist/appointments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'  // Only include content-type
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

        // Remove Authorization header since JWT is not being used for now
        fetch('/dentist/update_record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Only include content-type
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
document.addEventListener("DOMContentLoaded", () => {
    const appointmentList = document.getElementById("appointmentList");
    const recordList = document.getElementById("recordList");
    const billingList = document.getElementById("billingList");

    // Simulate data fetching for appointments
    const appointments = [
        { date: '2024-10-01', dentist: 'Dr. Smith', status: 'Scheduled' },
        { date: '2024-10-05', dentist: 'Dr. Brown', status: 'Completed' },
        { date: '2024-10-10', dentist: 'Dr. Clark', status: 'Pending' }
    ];

    // Load appointments
    appointments.forEach(appointment => {
        appointmentList.innerHTML += `
            <div class="appointment-item">
                <p>Date: ${appointment.date}</p>
                <p>Dentist: ${appointment.dentist}</p>
                <p>Status: ${appointment.status}</p>
            </div>
        `;
    });

    // Simulate data fetching for patient records
    const records = [
        { date: '2024-10-01', patient: 'John Doe', notes: 'Routine checkup' },
        { date: '2024-10-05', patient: 'Jane Smith', notes: 'Tooth extraction' }
    ];

    // Load records
    records.forEach(record => {
        recordList.innerHTML += `
            <div class="record-item">
                <p>Date: ${record.date}</p>
                <p>Patient: ${record.patient}</p>
                <p>Notes: ${record.notes}</p>
            </div>
        `;
    });

    // Simulate data fetching for billing
    const billings = [
        { date: '2024-10-01', amount: '$150', status: 'Paid' },
        { date: '2024-10-05', amount: '$200', status: 'Pending' }
    ];

    // Load billing data
    billings.forEach(billing => {
        billingList.innerHTML += `
            <div class="billing-item">
                <p>Date: ${billing.date}</p>
                <p>Amount: ${billing.amount}</p>
                <p>Status: ${billing.status}</p>
            </div>
        `;
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Load existing appointments and records
    const appointmentList = document.getElementById("appointmentList");
    const treatmentList = document.getElementById("treatmentList");
    const billingList = document.getElementById("billingList");

    // Fetch appointments
    fetch('/dentist/appointments')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadAppointments(data.appointments);
            }
        });

    // Fetch treatment records
    fetch('/dentist/treatment_records')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadTreatments(data.records);
            }
        });

    // Fetch billing
    fetch('/dentist/billing')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadBilling(data.billing);
            }
        });

    // Load appointments into the DOM
    function loadAppointments(appointments) {
        appointments.forEach(appointment => {
            appointmentList.innerHTML += `
                <div class="appointment-item">
                    <p>Date: ${appointment.date}</p>
                    <p>Dentist: ${appointment.dentist}</p>
                    <p>Status: ${appointment.status}</p>
                    <button class="edit-btn" onclick="editAppointment(${appointment.id})">Edit</button>
                </div>
            `;
        });
    }

    // Load treatment records into the DOM
    function loadTreatments(records) {
        records.forEach(record => {
            treatmentList.innerHTML += `
                <div class="treatment-item">
                    <p>Date: ${record.date}</p>
                    <p>Patient: ${record.patient}</p>
                    <p>Notes: ${record.notes}</p>
                    <button class="edit-btn" onclick="editTreatment(${record.id})">Edit</button>
                </div>
            `;
        });
    }

    // Load billing into the DOM
    function loadBilling(billing) {
        billing.forEach(bill => {
            billingList.innerHTML += `
                <div class="billing-item">
                    <p>Date: ${bill.date}</p>
                    <p>Amount: ${bill.amount}</p>
                    <p>Status: ${bill.status}</p>
                    <button class="edit-btn" onclick="editBilling(${bill.id})">Edit</button>
                </div>
            `;
        });
    }

    // Add new appointment
    document.getElementById('addAppointmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('newAppointmentDate').value;
        const dentist = document.getElementById('newAppointmentDentist').value;
        const status = document.getElementById('newAppointmentStatus').value;

        fetch('/dentist/add_appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, dentist, status })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Appointment added successfully!');
                location.reload();  // Reload to show updated data
            }
        });
    });

    // Add new treatment record
    document.getElementById('addTreatmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('newTreatmentDate').value;
        const dentist = document.getElementById('newTreatmentDentist').value;
        const treatment = document.getElementById('newTreatmentDetails').value;

        fetch('/dentist/add_treatment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, dentist, treatment })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Treatment record added successfully!');
                location.reload();
            }
        });
    });

    // Add new billing
    document.getElementById('addBillingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('newBillingDate').value;
        const amount = document.getElementById('newBillingAmount').value;
        const status = document.getElementById('newBillingStatus').value;

        fetch('/dentist/add_billing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, amount, status })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Billing added successfully!');
                location.reload();
            }
        });
    });

    // Edit appointment
    window.editAppointment = function(id) {
        // Show form pre-filled with appointment data
        const appointment = findAppointmentById(id);
        document.getElementById('newAppointmentDate').value = appointment.date;
        document.getElementById('newAppointmentDentist').value = appointment.dentist;
        document.getElementById('newAppointmentStatus').value = appointment.status;

        // Update after editing
        document.getElementById('addAppointmentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const date = document.getElementById('newAppointmentDate').value;
            const dentist = document.getElementById('newAppointmentDentist').value;
            const status = document.getElementById('newAppointmentStatus').value;

            fetch(`/dentist/update_appointment/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, dentist, status })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Appointment updated successfully!');
                    location.reload();
                }
            });
        });
    };
   logoutBtn.addEventListener('click', function () {
        // clear local storage and redirect to the login page
        localStorage.removeItem('token');  // simulating logout
        localStorage.removeItem('username');
        alert('You have been logged out!');
        window.location.href = '/login';  // redirect to the login page
    });

});

