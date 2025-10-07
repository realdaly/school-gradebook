import Database from "@tauri-apps/plugin-sql";

export default async function updateClass(title, theme, category, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE class SET title = $1, theme = $2, category = $3 WHERE id = $4",
        [title, theme, category, id],
    );

}