# API REST de productos 🚀

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

## Estructura

```text
src/
├── config/       # Conexión con Firebase
├── controllers/  # Entrada y salida HTTP
├── middlewares/  # JWT y manejo de errores
├── models/       # Operaciones de Firestore
├── routes/       # Definición de endpoints
├── services/     # Reglas de negocio y validaciones
└── utils/        # Errores de la aplicación
```

## Configuración

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Copiar `.env.example` como `.env` y completar sus valores.

3. En Firebase Console, crear un proyecto y una base Firestore. Crear la
   colección `products`; la API también la crea automáticamente al insertar el
   primer producto. La configuración web se obtiene en **Configuración del
   proyecto > Tus apps**.

4. Durante el desarrollo, permitir lecturas y escrituras de Firestore para el
   proyecto. En producción se deben aplicar reglas seguras; el JWT de esta API
   no es interpretado automáticamente por las reglas de Firebase.

5. Ejecutar:

   ```bash
   npm run start
   ```

## Endpoints

| Método | Ruta | Descripción | Protegida |
|---|---|---|---|
| POST | `/auth/login` | Obtiene un token JWT | No |
| GET | `/api/products` | Lista productos | Sí |
| GET | `/api/products/:id` | Obtiene un producto | Sí |
| POST | `/api/products/create` | Crea un producto | Sí |
| PUT | `/api/products/:id` | Actualiza parcialmente un producto | Sí |
| DELETE | `/api/products/:id` | Elimina un producto | Sí |

Ejemplo de login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@tienda.com","password":"cambiar-esta-clave"}'
```

Ejemplo de creación (reemplazar `<TOKEN>`):

```bash
curl -X POST http://localhost:3000/api/products/create \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <TOKEN>' \
  -d '{"name":"Teclado","price":45000,"description":"Mecánico"}'
```

Un producto requiere `name` (texto), `price` (número no negativo) y `description`. La API responde con 400 para datos inválidos, 401 para
credenciales o autorización ausente, 403 para tokens inválidos o vencidos, 404
para recursos/rutas inexistentes y 500 ante fallos internos o de Firestore.

## Pruebas

```bash
npm test
```
