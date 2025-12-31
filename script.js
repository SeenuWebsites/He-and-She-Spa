// Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize Services from localStorage or default data
function initializeServices() {
    let services = JSON.parse(localStorage.getItem('spaServices')) || [
        {
            id: 1,
            name: 'Swedish Massage',
            description: 'A gentle, relaxing massage using long strokes and kneading techniques.',
            price: 1500,
            duration: '60 minutes',
            icon: 'fas fa-hands'
        },
        {
            id: 2,
            name: 'Deep Tissue Massage',
            description: 'Intense massage targeting deep muscle layers to relieve chronic tension.',
            price: 2000,
            duration: '90 minutes',
            icon: 'fas fa-spa'
        },
        {
            id: 3,
            name: 'Facial Treatment',
            description: 'Rejuvenating facial treatment with premium products for glowing skin.',
            price: 1800,
            duration: '75 minutes',
            icon: 'fas fa-smile'
        },
        {
            id: 4,
            name: 'Body Scrub',
            description: 'Exfoliating body scrub to remove dead skin cells and reveal smooth skin.',
            price: 1200,
            duration: '45 minutes',
            icon: 'fas fa-hand-sparkles'
        },
        {
            id: 5,
            name: 'Aromatherapy',
            description: 'Therapeutic massage using essential oils for relaxation and wellness.',
            price: 2200,
            duration: '90 minutes',
            icon: 'fas fa-leaf'
        },
        {
            id: 6,
            name: 'Hot Stone Therapy',
            description: 'Relaxing massage with heated stones for deep muscle relaxation.',
            price: 2500,
            duration: '90 minutes',
            icon: 'fas fa-fire'
        }
    ];
    localStorage.setItem('spaServices', JSON.stringify(services));
    return services;
}

// Load Services
function loadServices() {
    const services = JSON.parse(localStorage.getItem('spaServices')) || initializeServices();
    const servicesGrid = document.getElementById('servicesGrid');
    const serviceSelect = document.getElementById('serviceSelect');
    
    if (servicesGrid) {
        servicesGrid.innerHTML = '';
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <i class="${service.icon}"></i>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="service-price">₹${service.price}</div>
                <p style="color: #999; font-size: 0.9rem;">Duration: ${service.duration}</p>
            `;
            servicesGrid.appendChild(serviceCard);
        });
    }
    
    // Populate service select in contact form
    if (serviceSelect) {
        serviceSelect.innerHTML = '<option value="">Select a Service</option>';
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = `${service.name} - ₹${service.price}`;
            serviceSelect.appendChild(option);
        });
    }
}

// Initialize Appointments
function initializeAppointments() {
    if (!localStorage.getItem('appointments')) {
        localStorage.setItem('appointments', JSON.stringify([]));
    }
}

// Handle Appointment Form Submission
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const newAppointment = {
            id: Date.now(),
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value,
            serviceId: parseInt(document.getElementById('serviceSelect').value),
            date: document.getElementById('appointmentDate').value,
            message: document.getElementById('customerMessage').value,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        // Show success message
        showMessage('Appointment booked successfully! We will contact you soon.', 'success');
        
        // Reset form
        appointmentForm.reset();
    });
}

// Show Message Function
function showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeServices();
    initializeAppointments();
    loadServices();
});

