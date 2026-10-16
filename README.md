# 🛒 E-Com Fullstack Application

A responsive full-stack e-commerce web application built using **Spring Boot**, **React**, and **MySQL**. It features complete product lifecycle management (CRUD), real-time search across multiple fields, and multipart image uploading with database persistence.

---

## 🚀 Tech Stack

### Backend
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

---

## ✨ Key Features

- **Full CRUD Management**: Create, view, edit, and delete products seamlessly.
- **Multipart Media Uploads**: Handles concurrent JSON metadata and image uploads via `MultipartFile`.
- **Image Streaming**: Dynamically serves images directly from the database using custom endpoints and MIME type detection.
- **Multi-Field Search**: Real-time keyword search querying name, description, brand, and category via custom JPQL.
- **Dynamic Inventory State**: Instant stock availability and conditional cart toggling based on live quantity.

---

## 📁 Project Structure

```text
E-Com-fullstack/
├── backend/                  # Spring Boot application
│   ├── src/main/java/        # Controllers, Models, Repositories, Services
│   ├── src/main/resources/   # application.properties & schema configs
│   └── pom.xml               # Maven dependencies
└── frontend/                 # React application
    ├── public/
    ├── src/
    │   ├── components/       # Home, Product, AddProduct, UpdateProduct, Navbar
    │   ├── Context/          # Global application state management
    │   └── App.jsx           # Client-side routing
    └── package.json
