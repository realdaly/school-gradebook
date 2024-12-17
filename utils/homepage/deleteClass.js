import Database from "@tauri-apps/plugin-sql";

export default async function deleteClass(id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "DELETE FROM class WHERE id = $1",
        [id]
    );

}