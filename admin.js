let currentEditingServiceId = null;

// Admin Credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'Admin@546'
};

// Check Authentication
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (isAuthenticated) {
        showAdminPanel();
    } else {
        showLoginForm();
    }
}

// Show Login Form
function showLoginForm() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminSection').style.display = 'none';
}

// Show Admin Panel
function showAdminPanel() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'block';
    loadServices();
    loadAppointments();
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        errorDiv.style.display = 'none';
        showAdminPanel();
    } else {
        errorDiv.textContent = 'Invalid username or password. Please try again.';
        errorDiv.style.display = 'block';
        document.getElementById('password').value = '';
    }
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminAuthenticated');
        document.getElementById('loginForm').reset();
        showLoginForm();
    }
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});

// Tab Switching
function showTab(tabName) {
    // Hide all tabs
    document.getElementById('servicesTab').style.display = 'none';
    document.getElementById('appointmentsTab').style.display = 'none';
    
    // Remove active class from all buttons
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    if (tabName === 'services') {
        document.getElementById('servicesTab').style.display = 'block';
        document.querySelectorAll('.admin-tab')[0].classList.add('active');
        loadServices();
    } else if (tabName === 'appointments') {
        document.getElementById('appointmentsTab').style.display = 'block';
        document.querySelectorAll('.admin-tab')[1].classList.add('active');
        loadAppointments();
    }
}

// Load Services
function loadServices() {
    const services = JSON.parse(localStorage.getItem('spaServices')) || [];
    const tbody = document.getElementById('servicesTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (services.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No services found. Add your first service!</td></tr>';
        return;
    }
    
    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.id}</td>
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>₹${service.price}</td>
            <td>${service.duration}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editService(${service.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger" onclick="deleteService(${service.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Load Appointments
function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const services = JSON.parse(localStorage.getItem('spaServices')) || [];
    const tbody = document.getElementById('appointmentsTableBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (appointments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No appointments found.</td></tr>';
        return;
    }
    
    appointments.forEach(appointment => {
        const service = services.find(s => s.id === appointment.serviceId);
        const serviceName = service ? service.name : 'Unknown Service';
        const statusClass = appointment.status === 'confirmed' ? 'success' : 
                           appointment.status === 'cancelled' ? 'error' : '';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.name}</td>
            <td>${appointment.phone}</td>
            <td>${appointment.email}</td>
            <td>${serviceName}</td>
            <td>${formatDateTime(appointment.date)}</td>
            <td>
                <select onchange="updateAppointmentStatus(${appointment.id}, this.value)" 
                        style="padding: 5px; border-radius: 5px; border: 1px solid #ddd;">
                    <option value="pending" ${appointment.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="confirmed" ${appointment.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="cancelled" ${appointment.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    <option value="completed" ${appointment.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-danger" onclick="deleteAppointment(${appointment.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Format DateTime
function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Open Service Modal
function openServiceModal(serviceId = null) {
    const modal = document.getElementById('serviceModal');
    const form = document.getElementById('serviceForm');
    const modalTitle = document.getElementById('modalTitle');
    
    currentEditingServiceId = serviceId;
    
    if (serviceId) {
        modalTitle.textContent = 'Edit Service';
        const services = JSON.parse(localStorage.getItem('spaServices')) || [];
        const service = services.find(s => s.id === serviceId);
        
        if (service) {
            document.getElementById('serviceName').value = service.name;
            document.getElementById('serviceDescription').value = service.description;
            document.getElementById('servicePrice').value = service.price;
            document.getElementById('serviceDuration').value = service.duration;
            document.getElementById('serviceIcon').value = service.icon;
        }
    } else {
        modalTitle.textContent = 'Add New Service';
        form.reset();
    }
    
    modal.classList.add('active');
}

// Close Service Modal
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    currentEditingServiceId = null;
    document.getElementById('serviceForm').reset();
}

// Handle Service Form Submission
document.getElementById('serviceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const services = JSON.parse(localStorage.getItem('spaServices')) || [];
    const serviceData = {
        name: document.getElementById('serviceName').value,
        description: document.getElementById('serviceDescription').value,
        price: parseInt(document.getElementById('servicePrice').value),
        duration: document.getElementById('serviceDuration').value,
        icon: document.getElementById('serviceIcon').value
    };
    
    if (currentEditingServiceId) {
        // Update existing service
        const index = services.findIndex(s => s.id === currentEditingServiceId);
        if (index !== -1) {
            services[index] = { ...services[index], ...serviceData };
        }
    } else {
        // Add new service
        const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
        services.push({ id: newId, ...serviceData });
    }
    
    localStorage.setItem('spaServices', JSON.stringify(services));
    closeServiceModal();
    loadServices();
    
    // Reload services on main page if it's open
    if (window.opener) {
        window.opener.loadServices();
    }
    
    showMessage('Service saved successfully!', 'success');
});

// Edit Service
function editService(id) {
    openServiceModal(id);
}

// Delete Service
function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        const services = JSON.parse(localStorage.getItem('spaServices')) || [];
        const filtered = services.filter(s => s.id !== id);
        localStorage.setItem('spaServices', JSON.stringify(filtered));
        loadServices();
        showMessage('Service deleted successfully!', 'success');
    }
}

// Update Appointment Status
function updateAppointmentStatus(id, status) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const index = appointments.findIndex(a => a.id === id);
    
    if (index !== -1) {
        appointments[index].status = status;
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
        showMessage('Appointment status updated!', 'success');
    }
}

// Delete Appointment
function deleteAppointment(id) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const filtered = appointments.filter(a => a.id !== id);
        localStorage.setItem('appointments', JSON.stringify(filtered));
        loadAppointments();
        showMessage('Appointment deleted successfully!', 'success');
    }
}

// Show Message
function showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    const adminContainer = document.querySelector('.admin-container');
    if (adminContainer) {
        adminContainer.insertBefore(messageDiv, adminContainer.firstChild);
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Close modal when clicking outside
document.getElementById('serviceModal').addEventListener('click', (e) => {
    if (e.target.id === 'serviceModal') {
        closeServiceModal();
    }
});

