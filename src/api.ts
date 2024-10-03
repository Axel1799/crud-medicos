import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/dengue-management-app', // Asegúrate de que esta URL sea correcta
  withCredentials: true, // Agrega esto si necesitas manejar cookies/sesiones en la solicitud
  headers: {
    'Content-Type': 'application/json', // Tipo de contenido esperado
  },
});

export default api;
