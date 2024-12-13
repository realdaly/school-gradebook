import Database from "@tauri-apps/plugin-sql";

export default async function createClass(title, theme){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        "INSERT into class (title, theme) VALUES ($1, $2) RETURNING id",
        [title, theme],
    );
}