import Database from "@tauri-apps/plugin-sql";

export default async function createStudent(name, classId){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        "INSERT into student (name, class_id) VALUES ($1, $2)",
        [name, classId],
    );
}