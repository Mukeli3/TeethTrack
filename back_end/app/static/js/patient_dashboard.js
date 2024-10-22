document.addEventListener("DOMContentLoaded", () => {
    const patientAppointmentList = document.getElementById("patientAppointmentList");
    const treatmentHistoryList = document.getElementById("treatmentHistoryList");
    const patientBillingList = document.getElementById("patientBillingList");
    const logoutBtn = document.querySelector('.nav-links a[href="#logout"]');

    // Simulate data fetching for appointments
    let appointments = [
        { date: '2024-10-02', dentist: 'Dr. Wilson', status: 'Confirmed' },
        { date: '2024-10-12', dentist: 'Dr. Lee', status: 'Pending' }
    ];

    // Simulate data fetching for treatment history
    let treatmentHistory = [
        { date: '2024-09-20', treatment: 'Root Canal', dentist: 'Dr. Smith' },
        { date: '2024-09-25', treatment: 'Teeth Whitening', dentist: 'Dr. Brown' }
    ];

    // Simulate data fetching for billing
    let billing = [
        { date: '2024-09-20', amount: '$300', status: 'Paid' },
        { date: '2024-09-25', amount: '$200', status: 'Pending' }
    ];

    // Load appointments
    loadAppointments(appointments);
    loadTreatmentHistory(treatmentHistory);
    loadBilling(billing);

    // Handle adding new entries
    document.getElementById('addAppointmentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const newDate = document.getElementById('newAppointmentDate').value;
        const newDentist = document.getElementById('newAppointmentDentist').value;
        const newStatus = document.getElementById('newAppointmentStatus').value;

        const newAppointment = { date: newDate, dentist: newDentist, status: newStatus };
        appointments.push(newAppointment);
        loadAppointments(appointments);
        alert('New appointment added!');
    });

    document.getElementById('addTreatmentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const newDate = document.getElementById('newTreatmentDate').value;
        const newTreatment = document.getElementById('newTreatmentDetails').value;
        const newDentist = document.getElementById('newTreatmentDentist').value;

        const newRecord = { date: newDate, treatment: newTreatment, dentist: newDentist };
        treatmentHistory.push(newRecord);
        loadTreatmentHistory(treatmentHistory);
        alert('New treatment record added!');
    });

    document.getElementById('addBillingForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const newDate = document.getElementById('newBillingDate').value;
        const newAmount = document.getElementById('newBillingAmount').value;
        const newStatus = document.getElementById('newBillingStatus').value;

        const newBill = { date: newDate, amount: newAmount, status: newStatus };
        billing.push(newBill);
        loadBilling(billing);
        alert('New billing record added!');
    });

    // Load appointments into the DOM
    function loadAppointments(appointments) {
        patientAppointmentList.innerHTML = '';
        appointments.forEach((appointment, index) => {
            const appointmentItem = document.createElement('div');
            appointmentItem.classList.add('appointment-item');
            appointmentItem.innerHTML = `
                <p>Date: <span class="editable" contenteditable="true">${appointment.date}</span></p>
                <p>Dentist: <span class="editable" contenteditable="true">${appointment.dentist}</span></p>
                <p>Status: <span class="editable" contenteditable="true">${appointment.status}</span></p>
                <button class="save-btn" data-index="${index}">Save</button>
            `;
            patientAppointmentList.appendChild(appointmentItem);
        });

        document.querySelectorAll('.save-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const appointmentItem = e.target.parentElement;
                const updatedDate = appointmentItem.querySelector('span:nth-child(1)').textContent;
                const updatedDentist = appointmentItem.querySelector('span:nth-child(2)').textContent;
                const updatedStatus = appointmentItem.querySelector('span:nth-child(3)').textContent;

                appointments[index].date = updatedDate;
                appointments[index].dentist = updatedDentist;
                appointments[index].status = updatedStatus;
                alert('Appointment updated successfully!');
            });
        });
    }

    // Handle treatment history updates (inline edit)
    function loadTreatmentHistory(history) {
        treatmentHistoryList.innerHTML = '';
        history.forEach((record, index) => {
            const recordItem = document.createElement('div');
            recordItem.classList.add('history-item');
            recordItem.innerHTML = `
                <p>Date: <span class="editable" contenteditable="true">${record.date}</span></p>
                <p>Treatment: <span class="editable" contenteditable="true">${record.treatment}</span></p>
                <p>Dentist: <span class="editable" contenteditable="true">${record.dentist}</span></p>
                <button class="save-btn" data-index="${index}">Save</button>
            `;
            treatmentHistoryList.appendChild(recordItem);
        });

        document.querySelectorAll('.save-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const recordItem = e.target.parentElement;
                const updatedDate = recordItem.querySelector('span:nth-child(1)').textContent;
                const updatedTreatment = recordItem.querySelector('span:nth-child(2)').textContent;
                const updatedDentist = recordItem.querySelector('span:nth-child(3)').textContent;

                treatmentHistory[index].date = updatedDate;
                treatmentHistory[index].treatment = updatedTreatment;
                treatmentHistory[index].dentist = updatedDentist;
                alert('Treatment history updated successfully!');
            });
        });
    }

    // Handle billing updates (inline edit)
    function loadBilling(bills) {
        patientBillingList.innerHTML = '';
        bills.forEach((bill, index) => {
            const billItem = document.createElement('div');
            billItem.classList.add('billing-item');
            billItem.innerHTML = `
                <p>Date: <span class="editable" contenteditable="true">${bill.date}</span></p>
                <p>Amount: <span class="editable" contenteditable="true">${bill.amount}</span></p>
                <p>Status: <span class="editable" contenteditable="true">${bill.status}</span></p> `;
		// <button class="save-btn" data-index="${index}">Save</button>
            patientBillingList.appendChild(billItem);
        });

        document.querySelectorAll('.save-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const billItem = e.target.parentElement;
                const updatedDate = billItem.querySelector('span:nth-child(1)').textContent;
                const updatedAmount = billItem.querySelector('span:nth-child(2)').textContent;
                const updatedStatus = billItem.querySelector('span:nth-child(3)').textContent;

                billing[index].date = updatedDate;
                billing[index].amount = updatedAmount;
                billing[index].status = updatedStatus;
                alert('Billing record updated successfully!');
            });
        });
    }

    // Logout functionality
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('token');  // simulating logout
        localStorage.removeItem('email');
        alert('You have been logged out!');
        window.location.href = '/login';  // Redirect to the login page
    });
});
