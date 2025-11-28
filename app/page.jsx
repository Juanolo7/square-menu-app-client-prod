import Category from "./components/Category";
import styles from "./menu.module.css";

async function getMenu() {
  const res = await fetch("http://localhost:3001/api/menu", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const menu = await getMenu();
console.log("MENU RESPONSE →", menu);

  return (
    <main className={styles.container}>
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
