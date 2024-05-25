// Sample array of doctors (replace with actual data)
const doctors = [
    { name: 'Dr. John Doe', location: 'New York', specialization: 'Family Medicine' },
    { name: 'Dr. Jane Smith', location: 'Los Angeles', specialization: 'Pediatrics' },
    { name: 'Dr. Michael Johnson', location: 'Chicago', specialization: 'Cardiology' }
    // Add more doctor objects as needed
];

// Function to filter doctors based on search criteria
function filterDoctors(location, specialization) {
    return doctors.filter(doctor =>
        (!location || doctor.location.toLowerCase().includes(location.toLowerCase())) &&
        (!specialization || doctor.specialization === specialization)
    );
}

// Function to render the doctor list
function renderDoctorList() {
    const doctorListContainer = document.getElementById('doctorList');
    doctorListContainer.innerHTML = '';

    doctors.forEach(doctor => {
        const doctorItem = document.createElement('div');
        doctorItem.classList.add('doctor-item');
        doctorItem.innerHTML = `
            <h2>${doctor.name}</h2>
            <p><strong>Location:</strong> ${doctor.location}</p>
            <p><strong>Specialization:</strong> ${doctor.specialization}</p>
        `;
        doctorListContainer.appendChild(doctorItem);
    });
}

// Render the doctor list when the page loads
document.addEventListener('DOMContentLoaded', function() {
    renderDoctorList();
});
