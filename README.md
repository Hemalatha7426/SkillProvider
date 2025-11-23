# SkillProvider – Course Learning Platform (Frontend)

> A React-based Skill Learning Platform — browse courses, learn modules, track progress & download certificates.  
> **By Hemalatha R**

---

## Overview

The **SkillProvider Application** provides an interactive learning experience where users can:

- Browse available courses stored in JSON  
- Read detailed modules, duration, level & descriptions  
- Track course progress  
- Unlock and download certificates after finishing modules  
- Navigate easily through a responsive and simple React UI  

This README explains the workflow, setup steps, tech stack, and application features.

---

## How it works

### **Course Loading from JSON**
- All course data is stored in `public/courses.json`.  
- React fetches and renders these details dynamically using `fetch()` or Axios.

### **Navigation**
A responsive navbar allows smooth access to:  
**Home | Courses | Dashboard | Profile | FAQ | About | Contact | Feedback**

### **Course Viewing**
Each course displays:
- **Title**  
- Category  
- Duration  
- Level  
- Modules  
- Course Image  

### **Module Completion**
- Users read modules sequentially.  
- When all modules are completed → **Certificate becomes available.**

### **Certificate Generation**
A PDF certificate is generated using **jsPDF** containing:
- Learner Name  
- Course Name  
- Completion Date  
- SkillProvider Branding  

### **User Interaction Pages**
- **Dashboard:** Shows enrolled courses & progress  
- **Profile:** User information & settings  
- **Feedback:** Ratings and comments  
- **Contact:** Support form  
- **FAQ:** Collapsible common questions  
- **About:** Platform purpose & introduction  

---

## Technologies Used

### **Frontend**
- React.js  
- React Router DOM  
- Axios  
- HTML5 / CSS3  
- jsPDF (certificate generation)

### **Storage**
- JSON (`public/courses.json`)

### **Tools**
- Node.js  
- Git / GitHub  
- VS Code  

---

