import Database from "@tauri-apps/plugin-sql";

export default async function createSubject(title, category){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        "INSERT into subject (title, category) VALUES ($1, $2)",
        [title, category],
    );
}