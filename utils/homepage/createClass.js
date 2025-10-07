import Database from "@tauri-apps/plugin-sql";

export default async function createClass(title, theme, category){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        "INSERT into class (title, theme, category) VALUES ($1, $2, $3)",
        [title, theme, category],
    );
}