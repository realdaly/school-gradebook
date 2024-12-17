import Database from "@tauri-apps/plugin-sql";

export default async function createSubject(name){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        "INSERT into subject (name) VALUES ($1)",
        [name],
    );
}