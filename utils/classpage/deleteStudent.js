import Database from "@tauri-apps/plugin-sql";

export default async function deleteStudent(id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "DELETE FROM student WHERE id = $1",
        [id]
    );

}