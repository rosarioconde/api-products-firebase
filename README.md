# API Rest de Administración de Productos 🚀

Este proyecto consiste en una **API Rest** escalable construida con **Node.js** y **Express**, diseñada para administrar el catálogo de productos de una tienda oficial. La persistencia de los datos se realiza en la nube a través de **Firebase Firestore** y cuenta con una capa de seguridad basada en **JSON Web Tokens (JWT)**.

La aplicación implementa una **arquitectura en capas** sólida (Rutas, Controladores, Servicios y Modelos) para garantizar la separación de responsabilidades y la mantenibilidad del código.

---

## 🛠️ Tecnologías Utilizadas

*   **Node.js** (Entorno de ejecución con ESModules)
*   **Express** (Framework web)
*   **Firebase/Firestore** (Base de datos NoSQL en la nube)
*   **JSON Web Tokens (jsonwebtoken)** (Autenticación y protección de rutas)
*   **CORS** (Habilitación de peticiones de origen cruzado)
*   **Body-Parser** (Middleware para interpretar JSON)
*   **Dotenv** (Gestión de variables de entorno)

---

## 📂 Arquitectura del Proyecto

El proyecto sigue una estructura limpia separando responsabilidades:

 

---

## ⚙️ Configuración Inicial

### 1. Clonar e Instalar Dependencias
Instalá todos los módulos necesarios ejecutando en tu terminal:
```bash
npm install