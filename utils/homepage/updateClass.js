import Database from "@tauri-apps/plugin-sql";

export default async function updateClass(title, theme, isLiterary, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE class SET title = $1, theme = $2, is_literary = $3 WHERE id = $4",
        [title, theme, isLiterary, id],
    );

}