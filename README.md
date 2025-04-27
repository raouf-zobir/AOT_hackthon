# 🌟 Smart Healthcare Assistant 🌟

<div class="scrollable-container">
  <img src="https://raw.githubusercontent.com/raouf-zobir/AOT_hackthon/refs/heads/main/images/HomePage.png" alt="Home Page">
  <img src="https://raw.githubusercontent.com/raouf-zobir/AOT_hackthon/refs/heads/main/images/DarkMode.png" alt="Dark Mode">
  <img src="https://raw.githubusercontent.com/raouf-zobir/AOT_hackthon/refs/heads/main/images/ContactUs.png" alt="Contact Us">
  <img src="https://raw.githubusercontent.com/raouf-zobir/AOT_hackthon/refs/heads/main/images/Login.png" alt="Login">
  <img src="https://raw.githubusercontent.com/raouf-zobir/AOT_hackthon/refs/heads/main/images/SignUp.png" alt="Sign Up">
  <img src="https://raw.githubusercontent.com/raouf-zobir/AOT_hackthon/refs/heads/main/images/Features.png" alt="Features">
  <img src="https://raw.githubusercontent.com/raouf-zobir/AOT_hackthon/refs/heads/main/images/Schdule.png" alt="Schedule">
</div>

## An All-in-One Platform for Smarter Healthcare

Welcome to the Smart Healthcare Assistant, a revolutionary platform designed to make healthcare more accessible, efficient, and user-friendly. By seamlessly integrating AI diagnosis (🩺 Jack), appointment booking (📅 Jeremy), and medication info (💊 Mimi), we're transforming the way individuals manage their health journey.

🚀 **Smarter, faster, easier healthcare!**

---

## Key Features

<p align="center">
  <img src="https://raw.githubusercontent.com/raouf-zobir/AOT_hackthon/refs/heads/main/images/Features.png" width="600" alt="Features Overview">
</p>

<style>
  .scrollable-container {
    display: flex;
    overflow: hidden;  /* Hides the scrollbars */
    width: 100%;  /* Adjust the container's width */
    justify-content: start;
    margin-bottom: 20px;
  }

  .scrollable-container img {
    width: 100%;  /* Make the images take full width of the container */
    max-width: 500px;  /* Set max width for the image size */
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
    opacity: 0.9;  /* Make the images slightly transparent */
  }

  .scrollable-container:hover img {
    transform: scale(1.05);  /* Slight zoom effect */
  }

  /* Container behavior to create sliding effect */
  .scrollable-container {
    display: flex;
    animation: slide 20s infinite linear;
  }

  .scrollable-container img {
    flex-shrink: 0;
    transition: transform 0.5s ease-in-out;
  }

  /* Slide the images horizontally */
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>

**Patients:**

* **Find Doctors:** Browse specialists with contact info.
* **Book Appointments:** Schedule easily online (Jeremy, powered by Gemini API).
* **Manage Appointments:** View/change your bookings.
* **Secure Chat:** Connect with your doctors.
* **AI Diagnosis:** Symptom check with our chatbot (Jack, powered by Gemini API - informational only).
* **Health Records:** Access your history & medication details (Mimi, from national medicine organization).
* **Personalize:** Dark mode & theme colors.

**Doctors:**

* View appointments.
* Manage schedules.
* Communicate with patients.

**General:**

* Intuitive, user-friendly design.
* Secure patient/doctor login.
* Easy ways to contact us (see Contact section).

---

## Technologies

* Frontend: HTML, CSS, JavaScript
* Backend: PHP
* Database: MySQL
* API Integration: JavaScript (for Gemini API integration)

---

## Setup

1.  Run chatbot API: `'start_chatbot.bat'`.
2.  Open in browser: `http://localhost/aot_hackthon/index.html`.

---

## How to Use

**For Patients:**

1.  **Sign Up/Log In.**
2.  **View Appointments** or **Browse Doctors.**
3.  For symptom advice, use **AI Diagnosis (Jack).**
4.  To find and book a doctor, use **Book Appointments (Jeremy).**
5.  For medication details, use **Health Records (Mimi).**

**For Doctors:**

* Log in to view and manage appointments, schedules, and communicate with patients.

---

## Contact

Questions? See the "Contact Me" page on the platform.

📞 Call Us: +213 540553447  
📧 Email: aotdevimpact@gmail.com  
🏢 Office: Algiers

---

Thanks for using **Smart Healthcare Assistant**! 🚀