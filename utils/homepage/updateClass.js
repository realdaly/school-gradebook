import Database from "@tauri-apps/plugin-sql";

export default async function updateClass(title, theme, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE class SET title = $1, theme = $2 WHERE id = $3",
        [title, theme, id],
    );

}