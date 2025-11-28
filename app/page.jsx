// square-menu-app-client/app/page.jsx

import Category from "./components/Category";
import styles from "../menu.module.css"; // Usa "../" para subir un nivel si el CSS está en la raíz del App

// 1. Define la URL base usando la variable de entorno NEXT_PUBLIC_API_URL.
//    Si no está definida (entorno local), usa el fallback de localhost.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getMenu() {
  // Llama a la URL de producción (Render) o a la URL local
  const res = await fetch(`${API_URL}/api/menu`, {
    // Esto asegura que Next.js obtenga datos frescos en cada solicitud (importante para un menú).
    cache: "no-store", 
  });

  if (!res.ok) {
    // Manejo de error si el servidor (Render) no responde o devuelve 5xx
    console.error(`Error fetching menu: ${res.status} ${res.statusText}`);
    return []; // Devuelve un array vacío para que la aplicación no falle.
  }

  return res.json();
}

export default async function Page() {
  const menu = await getMenu();
  console.log("MENU RESPONSE →", menu.length, "categories fetched.");

  return (
    <main className={styles.container}>
      {menu.length === 0 && (
        <p className={styles.errorMessage}>No se pudo cargar el menú o no hay ítems disponibles en esta ubicación.</p>
      )}
      
      {/* Mapea sobre las categorías recibidas del backend */}
      {menu.map(cat => (
        <Category
          key={cat.id}
          name={cat.name}
          items={cat.items}
        />
      ))}
    </main>
  );
}