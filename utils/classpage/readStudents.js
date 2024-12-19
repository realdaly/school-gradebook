import Database from "@tauri-apps/plugin-sql";

export default async function readStudents(classId){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});
    const students = await db.select("SELECT * FROM student WHERE class_id = $1", [classId]);

    return students;
}