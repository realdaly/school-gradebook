import Database from "@tauri-apps/plugin-sql";

export default async function updateStudent(name, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE student SET name = $1 WHERE id = $2",
        [name, id],
    );

}