import Database from "@tauri-apps/plugin-sql";

export default async function updateConfig(title, accentColor){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE config SET title = $1, accentColor = $2 WHERE id = $3",
        [title, accentColor, 1],
    );

}