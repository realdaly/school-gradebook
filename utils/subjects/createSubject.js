import Database from "@tauri-apps/plugin-sql";

export default async function createSubject(title){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        "INSERT into subject (title) VALUES ($1)",
        [title],
    );
}