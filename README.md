# He & She Spa Website

A beautiful, modern, and fully responsive website for He & She Spa with complete CRUD operations for managing services and appointments.

## Features

- 🎨 **Beautiful & Modern Design** - Elegant UI with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices (mobile, tablet, desktop)
- 🔧 **CRUD Operations** - Create, Read, Update, Delete for services and appointments
- 🖼️ **Gallery Section** - Beautiful images with attractive descriptions
- 👨‍💼 **Admin Panel** - Easy-to-use admin interface for managing content
- 📅 **Appointment Booking** - Customers can book appointments online
- 💾 **Local Storage** - Data persists using browser's localStorage

## Business Information

- **Shop Name:** He & She Spa
- **Opening Hours:** Monday - Sunday, 10:00 AM - 11:00 PM
- **Email:** heandshespa@gmail.com
- **Phone:** 7305465332
- **Address:** No. 14, Vivek Nagar, Ambattur, Chennai - 600053

## File Structure

```
He-and-She-Spa/
├── index.html          # Main homepage
├── admin.html          # Admin panel
├── styles.css          # All styling
├── script.js           # Main website JavaScript
├── admin.js            # Admin panel JavaScript
└── README.md           # This file
```

## How to Use

### For Customers

1. Open `index.html` in a web browser
2. Browse services, gallery, and information
3. Fill out the appointment form to book a service
4. Your appointment will be saved and visible in the admin panel

### For Administrators

1. Open `admin.html` in a web browser
2. **Login with credentials:**
   - Username: `admin`
   - Password: `Admin@546`
3. After successful login, you can:
   - Click on "Services" tab to:
     - View all services
     - Add new services
     - Edit existing services
     - Delete services
   - Click on "Appointments" tab to:
     - View all appointments
     - Update appointment status (Pending, Confirmed, Cancelled, Completed)
     - Delete appointments
4. Click "Logout" button to securely exit the admin panel

## CRUD Operations

### Services Management
- **Create:** Click "Add New Service" button and fill the form
- **Read:** All services are displayed in a table
- **Update:** Click "Edit" button on any service
- **Delete:** Click "Delete" button on any service

### Appointments Management
- **Create:** Customers create appointments through the booking form
- **Read:** All appointments are displayed in a table
- **Update:** Change appointment status using the dropdown
- **Delete:** Click "Delete" button on any appointment

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (Vanilla JS)
- Font Awesome Icons
- Unsplash Images (via CDN)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All data is stored in browser's localStorage
- Images are loaded from Unsplash CDN
- No backend server required - works as a static website
- For production use, consider connecting to a backend API

## Customization

You can easily customize:
- Colors in `styles.css` (CSS variables at the top)
- Services data in `script.js` (initializeServices function)
- Gallery images by replacing Unsplash URLs
- Business information in `index.html`

## Future Enhancements

- Connect to a backend API
- Add user authentication
- Email notifications for appointments
- Payment integration
- Customer reviews section
- Blog section

---

© 2024 He & She Spa. All rights reserved.

