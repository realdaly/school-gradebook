import Database from "@tauri-apps/plugin-sql";

export default async function deleteClass(currentClassId){
    const db = await Database.load("sqlite:grades.db");
    await db.execute(
        "DELETE FROM class WHERE id = $1",
        [currentClassId],
    );

}