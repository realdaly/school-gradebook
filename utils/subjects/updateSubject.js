import Database from "@tauri-apps/plugin-sql";

export default async function updateSubject(title, category, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE subject SET title = $1, category = $2 WHERE id = $3",
        [title, category, id],
    );

}